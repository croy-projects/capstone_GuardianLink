import "../styles/document_status.css";

const STATUS_CONFIG = {
    verified: {
        label: "Verified",
        icon: "🟢",
        title: "Background check verified by GuardianLink administration",
        className: "verified"
    },
    pending: {
        label: "Pending Review",
        icon: "🟡",
        title: "Background check submitted and awaiting review",
        className: "pending"
    },
    flagged: {
        label: "Action Needed",
        icon: "🔴",
        title: "Background check requires additional review",
        className: "flagged"
    },
    none: {
        label: "Not Verified",
        icon: "🟡",
        title: "Background check has not been verified",
        className: "unverified"
    }
};

function BackgroundCheckStatus({ status, hasDocument }) {


    if (!hasDocument) {
        return (
            <span
                className="background-status undefined"
                title="No background check submitted"
            >
                <span>🟡</span>
                <span>No Background Check Submitted</span>
            </span>
        );
    }

    const config =
        STATUS_CONFIG[status] || STATUS_CONFIG.none;

    const { icon, label, title, className } = config;

    return (
        <span
            className={`background-status ${className}`}
            title={title}
        >
            <span>{icon}</span>
            <span>{label}</span>
        </span>
    );
}

export default BackgroundCheckStatus;