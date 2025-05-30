import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import axios from "axios";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "@/utils/data";
import { Badge } from "../ui/badge";
import { toast } from "sonner";

const Description = () => {
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [applied, setApplied] = useState(false); // ✅ local applied state
  const { singleJob } = useSelector((store) => store.job);
 const {user} = useSelector((store) => store.auth);

 const applyJobHandler = async () => {
  try {
    const res = await axios.get(`${APPLICATION_API_ENDPOINT}/apply/${jobId}`, {
      withCredentials: true,
    });

    if (res.data.success) {
      console.log(res.data);
      toast.success(res.data.message);
    }
  } catch (error) {
    console.log(error.message);
    toast.error(error.response?.data?.message || "Something went wrong while applying.");
  }
};


  useEffect(() => {
    const fetchSingleJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.status) {
          dispatch(setSingleJob(res.data.job));
        } else {
          setError("Failed to fetch job.");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        setError(error.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchSingleJobs();
    }
  }, [jobId, dispatch,user?._id]);

  if(!singleJob){
    return <div>Loading...</div>;
  }

  const isApplied = singleJob?.applications?.some(
  (applications) => applications.applicant === user?._id
) || false;


  const handleApply = () => {
    setApplied(true); // ✅ change button label on click
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow relative">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && singleJob && (
        <>
          {/* Button on Top Right */}
          <div className="absolute top-4 right-4">
            <button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className={`px-4 py-2 rounded-md text-sm font-semibold ${
                isApplied
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {isApplied ? "Applied" : "Apply Now"}
            </button>
          </div>

          {/* Job Content */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{singleJob?.title}</h1>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge>{singleJob?.position}</Badge>
              <Badge className="bg-orange-100 text-orange-700">{singleJob?.salary}</Badge>
              <Badge className="bg-blue-100 text-blue-700">{singleJob?.location}</Badge>
              <Badge className="bg-green-100 text-green-700">{singleJob?.jobType}</Badge>
            </div>
          </div>

          <p className="mt-4 text-gray-700">{singleJob?.description}</p>

          <hr className="my-6 border-t border-gray-200" />

          <div className="grid grid-cols-2 gap-y-4 text-gray-800 text-sm">
            <div><strong>Role:</strong> {singleJob?.position} Open positions</div>
            <div><strong>Location:</strong> {singleJob?.location}</div>
            <div><strong>Salary:</strong> {singleJob?.salary} LPA</div>
            <div><strong>Experience:</strong> {singleJob?. experienceLevel} Years</div>
            <div><strong>Total Applicants:</strong> {singleJob?.applications?.length || 0}</div>
            <div><strong>Job Type:</strong> {singleJob?.jobType}</div>
            <div><strong>Post Date:</strong> {new Date(singleJob?.createdAt).toLocaleDateString()}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Description;
