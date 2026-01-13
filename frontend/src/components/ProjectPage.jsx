import { useEffect } from "react";
import { useParams } from "react-router-dom"

export const ProjectPage = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        
    })
    return (
        <div>
            <p>test</p>
        
        </div>

    )
}