import "../styles/document_status.css";

function ResumeStatus({ hasDocument }) {


    if (hasDocument) {
        return (
            <span
                className="background-status undefined"
                title="No background check submitted"
            >
                <span>🟢</span>
                <span>Resume Submitted</span>
            </span>
        );
    } else {
        return (
            <span
                className="background-status undefined"
                title="No background check submitted"
            >
                <span>🟡</span>
                <span>No Resume Submitted</span>
            </span>
        );

    }


}

export default ResumeStatus;