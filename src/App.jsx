import { useEffect, useState } from "react";

import { supabase } from "./supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import Banner from "./components/Banner";
import FormSection from "./components/FormSection";
import JobListingSection from "./components/JobListingSection";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";


const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    machine_type: "",
    serial_num: "",
    service_type: {
      repair: false,
      cleaning: false
    },
    notes: ""
  });
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchJobs();
        subscribeToJobs();
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession) {
        fetchJobs();
        subscribeToJobs();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignIn = async (email, password) => {
    // Check if email and password are provided
    if (!email || !password) {
      console.error("Email and password must be provided.");
      return;
    }

    // Authenticate with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error signing in:", error.message); // Use error.message for a clearer output
    } else {
      console.log("Sign-in successful:", data);
    }
  };


  const handleSignUp = async (email, password) => {
    // Check if email and password are provided
    if (!email || !password) {
      console.error("Email and password must be provided.");
      return;
    }

    // Sign up with Supabase
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      console.error("Error signing up:", signUpError.message); // Use error.message for a clearer output
      return;
    }

    if (signUpData?.user) {
      if (signUpData.user?.email_confirmed_at) {
        setSession(signUpData.session);
      } else {
        console.log("Please check your email to confirm your account.");
      }
    }
  };

  const handleForgotPassword = async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) {
        console.error("Error sending password reset email:", error.message);
      } else {
        console.log("Password reset email sent successfully.");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };


  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error logging out:', error);
    } else {
      setSession(null);  // Clear the session state on successful logout
    }
  };

  const fetchJobs = async () => {
    const { data, error } = await supabase.from('jobs').select('*');
    if (error) {
      console.error('Error fetching jobs:', error);
    } else {
      console.log("fetched jobs:", data);
      setJobs(data);
    }
  };

  const subscribeToJobs = () => {
    const channel = supabase
      .channel('jobs-channel')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'jobs',
      }, (payload) => {
        switch (payload.eventType) {
          case 'INSERT':
            setJobs((prevJobs) => [...prevJobs, payload.new]);
            break;
          case 'UPDATE':
            setJobs((prevJobs) =>
              prevJobs.map((job) =>
                job.id === payload.new.id ? payload.new : job
              )
            );
            break;
          case 'DELETE':
            setJobs((prevJobs) =>
              prevJobs.filter((job) => job.id !== payload.old.id)
            );
            break;
          default:
            break;
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "service_type") {
      setFormData((prevState) => ({
        ...prevState,
        service_type: {
          ...prevState.service_type,
          [value]: checked,
        },
      }));

    } else {

      setFormData((prevState) => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      }));
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      ...formData,
      service_type: formData.service_type,
      completed: editingJob ? editingJob.completed : false,
      last_modified: new Date().toISOString(),
    };

    try {
      if (editingJob) {
        const { error } = await supabase
          .from("jobs")
          .update(jobData)
          .eq("id", editingJob.id);

        if (error) throw error;

        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job.id === editingJob.id ? { ...job, ...jobData } : job
          )
        );
        setEditingJob(null);
      } else {
        const { data, error } = await supabase
          .from("jobs")
          .insert([jobData])
          .select();

        if (error) throw error;

        setJobs((prevJobs) => [...prevJobs, data[0]]);
      }

      setFormData({
        name: "",
        number: "",
        email: "",
        machine_type: "",
        serial_num: "",
        service_type: {
          repair: false,
          cleaning: false,
        },
        notes: "",
      });
    } catch (error) {
      console.error("Failed to save job:", error);
    }
  };

  const updateJobStatus = async (jobId, currentStatus) => {
    const updatedStatus = !currentStatus;

    try {
      const { error } = await supabase
        .from('jobs')
        .update({ completed: updatedStatus })
        .eq('id', jobId);

      if (error) {
        throw new Error("Failed to update job status: " + error.message);
      }

      console.log(`Job ${jobId} marked as ${updatedStatus ? "completed" : "in progress"} in Supabase.`);

      // Update local state
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === jobId ? { ...job, completed: updatedStatus } : job
        )
      );
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };

  const editJob = (job) => {
    const { name, number, email, machine_type, serial_num, service_type, notes } = job;

    const formTop = document.querySelector(".form-section");

    setFormData({
      name: name || "",
      number: number || "",
      email: email || "",
      machine_type: machine_type || "",
      serial_num: serial_num || "",
      service_type: {
        repair: service_type?.repair || false,
        cleaning: service_type?.cleaning || false,
      },
      notes: notes || "",
    });

    setEditingJob(job);

    formTop.scrollIntoView({ behavior: 'smooth' });
  };

  const deleteJob = async (id) => {
    try {
      console.log("Deleting job with ID:", id);

      const { error } = await supabase
        .from("jobs")
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error("Failed to delete job: " + error.message);
      }

      console.log(`Job ${id} deleted from Supabase.`);

      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));

    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  if (!session) {
    return (
      <>
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSignIn={handleSignIn}
          handleSignUp={handleSignUp}
          handleForgotPassword={handleForgotPassword}
        />
      </>
    );
  } else {
    return (
      <>
        <Header
          handleLogout={handleLogout}
          userEmail={session.user.email}
        />
        <Banner />
        <FormSection
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
        <JobListingSection
          jobs={jobs}
          updateJobStatus={updateJobStatus}
          editJob={editJob}
          deleteJob={deleteJob}
        />
      </>
    );
  }
};
export default App;