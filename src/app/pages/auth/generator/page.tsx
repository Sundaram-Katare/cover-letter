import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";


export default async function Generator() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect('/pages/signin');
    }
    return (
        <>
            <div className="flex justify-center items-center p-6 m-16 ">
                <div className="grid grid-cols-2 gap-40 ">
                    <div className=" mx-auto p-6 border rounded-xl min-w-xl font-poppins bg-white shadow-md">
                        {/* Header */}
                        <h2 className="text-2xl font-semibold mb-6">Generate your cover letter</h2>

                        {/* Job Description */}
                        <div className="mb-6">
                            <label htmlFor="jobDescription" className="block text-lg font-semibold mb-1">
                                Content
                            </label>
                            <p className="text-sm text-gray-600 mb-2">Paste the Job Description below (max 1000 words)</p>
                            <textarea
                                name="jobDescription"
                                id="jobDescription"
                                rows={8}
                                maxLength={8000} // approx 1000 words
                                className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter job description here..."
                            />
                            <div className="text-right text-xs text-gray-500 mt-1">0/1000 words</div>
                        </div>

                        {/* Resume Upload */}
                        <div className="mb-6">
                            <label htmlFor="resume" className="block text-lg font-semibold mb-2">
                                Upload Resume
                            </label>
                            <input
                                type="file"
                                id="resume"
                                accept=".pdf,.doc,.docx"
                                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Tone Selection */}
                        <div className="mb-6">
                            <label htmlFor="tone" className="block text-lg font-semibold mb-2">
                                Select Tone
                            </label>
                            <select
                                id="tone"
                                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Choose tone...</option>
                                <option value="formal">Formal</option>
                                <option value="friendly">Friendly</option>
                                <option value="enthusiastic">Enthusiastic</option>
                                <option value="professional">Professional</option>
                            </select>
                        </div>

                        {/* Generate Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
                        >
                            Generate
                        </button>
                    </div>

                    <div className="flex items-center justify-center flex-col p-6 bg-gray-100 rounded-xl font-poppins">
                        <img src="https://i.pinimg.com/originals/68/b8/94/68b8941dab3b0f8047dc1c731456d175.gif" className="h-48" alt="" />
                        <h2>Your results will appear here</h2>
                    </div>
                </div>
            </div>
        </>
    )
}
