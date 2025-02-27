import axios from "axios";
import "./ReportForm.css"

const ReportForm = ({ gameName, setIsReportFormVisible, setIsReported }) => {

    const handleReportSubmit = async (event) => {

        try {
            event.preventDefault();

            const formData = new FormData(event.target);
            const reportData = {
                game_name: gameName,
                message: formData.get('message'),
            };

            await axios.post("/api/report", reportData);
            setIsReportFormVisible(false);
            setIsReported(true);
            localStorage.setItem(`reported_${gameName}`, 'true');

        } catch (error) {
            console.log("ERROR REPORTING")
        }

    };

    return (
        <div className="report-form">
            <h2>Report {gameName}</h2>
            <form onSubmit={handleReportSubmit} encType="multipart/form-data">
                <input
                    type="email"
                    name="email"
                    required
                    value="infinityplay@gmail.com"
                    readOnly
                />
                <textarea
                    name="message"
                    required
                    placeholder="Describe the issue..."
                    rows="5"
                />
                <div className="form-buttons">
                    <button type="submit">
                        Submit Report
                    </button>
                    <button type="button" onClick={() => setIsReportFormVisible(false)}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ReportForm;