import React, { useEffect, useState } from "react";
import api from "../api.js";

export default function Messages() {
    const [inbox, setInbox] = useState([]);
    const [sent, setSent] = useState([]);

    useEffect(() => {
        api.get("/messages/inbox").then(res => setInbox(res.data));
        api.get("/messages/sent").then(res => setSent(res.data));
    }, []);
    return(
        <div>
            // add your code here guys 
        </div>
    );
}