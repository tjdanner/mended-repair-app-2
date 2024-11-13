import { useEffect, useState, useRef } from "react";
import { supabase } from "./supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Banner from "./components/Banner";
import FormSection from "./components/FormSection";
import JobListingSection from "./components/JobListingSection";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import { useLocation, useNavigate } from "react-router-dom";

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
    brand: "", // Add brand field
    serial_num: "",
    service_type: {
      repair: false,
      cleaning: false
    },
    notes: ""
  });
  const [editingJob, setEditingJob] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "" });

  const location = useLocation();
  const navigate = useNavigate();
  const jobRefs = useRef({});

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
    if (!email || !password) {
      setNotification({ message: "Email and password must be provided.", type: "error" });
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setNotification({ message: `Error signing in: ${error.message}`, type: "error" });
    } else {
      setNotification({ message: "Sign-in successful.", type: "success" });
    }
  };

  const handleSignUp = async (email, password) => {
    if (!email || !password) {
      setNotification({ message: "Email and password must be provided.", type: "error" });
      return;
    }

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setNotification({ message: `Error signing up: ${signUpError.message}`, type: "error" });
      return;
    }

    if (signUpData?.user) {
      if (signUpData.user?.email_confirmed_at) {
        setSession(signUpData.session);
        setNotification({ message: "Sign-up successful.", type: "success" });
      } else {
        setNotification({ message: "Please check your email to confirm your account.", type: "info" });
      }
    }
  };

  const handleForgotPassword = async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) {
        setNotification({ message: `Error sending password reset email: ${error.message}`, type: "error" });
      } else {
        setNotification({ message: "Password reset email sent successfully.", type: "success" });
      }
    } catch (err) {
      setNotification({ message: `Error: ${err.message}`, type: "error" });
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      setNotification({ message: `Error logging out: ${error.message}`, type: "error" });
    } else {
      setSession(null);
      setNotification({ message: "Logged out successfully.", type: "success" });
    }
  };

  const fetchJobs = async () => {
    const { data, error } = await supabase.from('jobs').select('*');
    if (error) {
      setNotification({ message: `Error fetching jobs: ${error.message}`, type: "error" });
    } else {
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
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      ...formData,
      service_type: formData.service_type,
      completed: editingJob ? editingJob.completed : false,
      last_modified: new Date().toISOString(),
      created_by: session.user.email.split('@')[0],
      modified_by: session.user.email.split('@')[0],
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
        setNotification({ message: "Job updated successfully.", type: "success" });

        // Scroll to the updated job card
        setTimeout(() => {
          jobRefs.current[editingJob.id]?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const { data, error } = await supabase
          .from("jobs")
          .insert([jobData])
          .select();

        if (error) throw error;

        setJobs((prevJobs) => [...prevJobs, data[0]]);
        setNotification({ message: "Job created successfully.", type: "success" });
      }

      setFormData({
        name: "",
        number: "",
        email: "",
        machine_type: "",
        brand: "", // Reset brand field
        serial_num: "",
        service_type: {
          repair: false,
          cleaning: false,
        },
        notes: "",
      });
    } catch (error) {
      setNotification({ message: `Failed to save job: ${error.message}`, type: "error" });
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

      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === jobId ? { ...job, completed: updatedStatus } : job
        )
      );
      setNotification({ message: `Job ${updatedStatus ? "completed" : "reopened"} successfully.`, type: "success" });
    } catch (error) {
      setNotification({ message: `Error updating job status: ${error.message}`, type: "error" });
    }
  };

  const editJob = (job) => {
    const { name, number, email, machine_type, brand, serial_num, service_type, notes } = job;

    const formTop = document.querySelector(".form-section");

    setFormData({
      name: name || "",
      number: number || "",
      email: email || "",
      machine_type: machine_type || "",
      brand: brand || "", // Set brand field
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
      const { error } = await supabase
        .from("jobs")
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error("Failed to delete job: " + error.message);
      }

      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
      setNotification({ message: "Job deleted successfully.", type: "success" });
    } catch (error) {
      setNotification({ message: `Error deleting job: ${error.message}`, type: "error" });
    }
  };

  if (!session) {
    return (
      <>
        <Notification message={notification.message} type={notification.type} />
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
        <Notification message={notification.message} type={notification.type} />
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
          username={session.user.email.split('@')[0]}
          jobRefs={jobRefs}
        />
      </>
    );
  }
};

export default App;