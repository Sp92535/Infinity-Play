import { useState } from "react";
import axios from "axios";
import "./UploadGame.css";

const UploadGame = () => {
    const [gameName, setGameName] = useState("");
    const [gameDescription, setGameDescription] = useState("");
    const [gameCategory, setGameCategory] = useState([]);
    const [gameKeywords, setGameKeywords] = useState([]);
    const [categoryInput, setCategoryInput] = useState("");
    const [keywordsInput, setKeywordsInput] = useState("");
    const [image, setImage] = useState(null);
    const [isFlash, setIsFlash] = useState(true);
    const [htmlLink, setHtmlLink] = useState("");
    const [swfFile, setSwfFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUploading(true);

        const formData = new FormData();
        formData.append("gameName", gameName.trim());
        formData.append("gameDescription", gameDescription.trim());
        gameCategory.forEach((cat) => formData.append("gameCategory", cat));
        gameKeywords.forEach((key) => formData.append("gameKeywords", key));
        formData.append("image", image);
        formData.append("isFlash", isFlash);
        if (isFlash) {
            formData.append("swfFile", swfFile);
        } else {
            formData.append("htmlLink", htmlLink);
        }

        try {
            await axios.post("/api/upload-game", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    "Content-Type": "multipart/form-data"
                },
            });

            alert("Game uploaded successfully");
        } catch (error) {
            console.error("Upload error:", error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleCategoryInput = (e) => {
        if ((e.key === " " || e.key === "Enter") && categoryInput.trim()) {
            e.preventDefault();
            setGameCategory([...gameCategory, categoryInput.trim()]);
            setCategoryInput("");
        }
    };

    const handleKeywordsInput = (e) => {
        if ((e.key === " " || e.key === "Enter") && keywordsInput.trim()) {
            e.preventDefault();
            setGameKeywords([...gameKeywords, keywordsInput.trim()]);
            setKeywordsInput("");
        }
    };

    const removeCategory = (index) => {
        setGameCategory(gameCategory.filter((_, i) => i !== index));
    };

    const removeKeyword = (index) => {
        setGameKeywords(gameKeywords.filter((_, i) => i !== index));
    };

    return (
        <form className="upload-game-form" onSubmit={handleSubmit}>
            <label>Game Name</label>
            <input type="text" placeholder="Game Name" value={gameName} onChange={(e) => setGameName(e.target.value)} required disabled={isUploading} />

            <label>Game Description</label>
            <textarea placeholder="Game Description" value={gameDescription} onChange={(e) => setGameDescription(e.target.value)} required disabled={isUploading} />

            <label>Game Category</label>
            <div className="tag-input">
                {gameCategory.map((category, index) => (
                    <span key={index} className="tag" onClick={() => !isUploading && removeCategory(index)}>
                        {category} ✖
                    </span>
                ))}
                <input
                    type="text"
                    placeholder="Type and press Space/Enter"
                    value={categoryInput}
                    onChange={(e) => setCategoryInput(e.target.value)}
                    onKeyDown={handleCategoryInput}
                    disabled={isUploading}
                />
            </div>

            <label>Game Keywords</label>
            <div className="tag-input">
                {gameKeywords.map((keyword, index) => (
                    <span key={index} className="tag" onClick={() => !isUploading && removeKeyword(index)}>
                        {keyword} ✖
                    </span>
                ))}
                <input
                    type="text"
                    placeholder="Type and press Space/Enter"
                    value={keywordsInput}
                    onChange={(e) => setKeywordsInput(e.target.value)}
                    onKeyDown={handleKeywordsInput}
                    disabled={isUploading}
                />
            </div>

            <label>Game Thumbnail</label>
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required disabled={isUploading} />

            <div className="checkbox-group">
                <label htmlFor="flash-game">Flash Game</label>
                <input type="checkbox" id="flash-game" checked={isFlash} onChange={() => !isUploading && setIsFlash(!isFlash)} disabled />
            </div>

            {!isFlash ? (
                <>
                    <label>HTML Link</label>
                    <input key="html-link" type="text" placeholder="HTML Link" value={htmlLink} onChange={(e) => setHtmlLink(e.target.value)} required disabled={isUploading} />
                </>
            ) : (
                <>
                    <label>SWF File</label>
                    <input key="swf-file" type="file" accept=".swf" onChange={(e) => setSwfFile(e.target.files?.[0])} required disabled={isUploading} />
                </>
            )}

            <button type="submit" disabled={isUploading}>
                {isUploading ? "Uploading..." : "Upload Game"}
            </button>
        </form>
    );
};

export default UploadGame;
