import React, {useState} from 'react';
import "../../css/tag_input.css"

import { useLocation } from "react-router-dom";

const TagInput = ({ onTagsChange }) => {
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");

  const handleKeyDown = (e)=>{
    const code = e.keyCode || e.which;
    const newTag = tag.trim();
    if(
        (code !== 13 && code !==188) || tag.length === 0
    ){
        return;
    }
    if(!tags.includes(tag)){
        setTags([...tags, newTag]);
        onTagsChange([...tags, newTag]);
    }
    setTimeout(()=>{
        setTag("");
    }, 0)
  }

  const deleteTag = (index)=>{
    const dupTags = [...tags];
    dupTags.splice(index, 1)
    setTags(dupTags);
    onTagsChange(dupTags);
  }

  const location = useLocation();
  const style = location.pathname === '/admin' ? { marginTop: '2em' } : { marginTop: '8em' };


  return (
    <div className='tag-input-box' style={style}>
        <div className='tags-container' >
            {tags.map((tag, index) => (
                <div className='tag' key={index}>
                    <span className='name'>{tag}</span>
                    <span 
                        className='icon' 
                        onClick={()=>deleteTag(index)}
                    >&times;</span>
                </div>
            ))}
            <input 
            type="text"
            id="tag-input"
            placeholder="Type tag here"
            value={tag}
            maxLength={50}
            onChange={(e)=>setTag(e.target.value)}
            onKeyDown={handleKeyDown}
            />
        </div>
    </div>
  );
};

export default TagInput;
