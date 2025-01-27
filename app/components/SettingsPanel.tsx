import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase.client'

export default function SettingsPanel({ userId }) {
  const [apiKeys, setApiKeys] = useState([])
  const [newProfile, setNewProfile] = useState({
    ProfileName: '',
    AIProvider: 'Google',
    ModelID: '',
    APIKey: ''
  })

  useEffect(() => {
    if (userId) fetchSavedKeys()
  }, [userId])

  const fetchSavedKeys = async () => {
    const { data, error } = await supabase
      .from('SavedKeys')
      .select('APIKeys')
      .eq('user_id', userId)
    
    if (data?.length > 0) setApiKeys(data[0].APIKeys)
  }

  const saveProfile = async () => {
    if (!userId) return
    
    const { data } = await supabase
      .from('SavedKeys')
      .select()
      .eq('user_id', userId)

    const updatedKeys = data?.length > 0 
      ? [...data[0].APIKeys, newProfile]
      : [newProfile]

    const { error } = await supabase
      .from('SavedKeys')
      .upsert({ user_id: userId, APIKeys: updatedKeys })
    
    if (!error) fetchSavedKeys()
  }

  return (
    <div className="settings-panel">
      <div className="theme-switcher">
        {/* Theme switching UI */}
      </div>
      
      <div className="ai-profiles">
        <h3>AI Profiles</h3>
        <input placeholder="Profile Name" onChange={e => setNewProfile({...newProfile, ProfileName: e.target.value})} />
        <select onChange={e => setNewProfile({...newProfile, AIProvider: e.target.value})}>
          <option>Google</option>
          <option>OpenAI</option>
          <option>Anthropic</option>
        </select>
        <button onClick={saveProfile}>Save Profile</button>
        
        {apiKeys.map((profile, index) => (
          <div key={index} className="profile-item">
            <span>{profile.ProfileName}</span>
            <button onClick={() => deleteProfile(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}
