import { createContext, useContext, useState } from "react";

const ApplicationContext = createContext();

export function ApplicationProvider({ children }) {

    const [applicationData, setApplicationData] = useState({
        jobId: null,

        fullName: "",
        email: "",
        phone: "",
        location: "",

        currentJobTitle: "",
        experienceYears: "",
        linkedinUrl: "",

        resume: null,
        additionalDocuments: [],
        coverLetter: "",
        whyInterested: "",
        expectedSalary: "",
        salaryCurrency: "INR",
        applicantLocation: "",
        openToRemote: false,
        workAuthorized: false,
        requiresSponsorship: false,
        availableFrom: null
    });

    return (
        <ApplicationContext.Provider
            value={{
                applicationData,
                setApplicationData
            }}
        >
            {children}
        </ApplicationContext.Provider>
    );
}

export function useApplication() {
    return useContext(ApplicationContext);
}