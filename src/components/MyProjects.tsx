import React, { useState, useEffect } from 'react';
import { FolderOpen, Trash2, Copy, Play, ArrowLeft, Loader2, Calendar, Tag, UploadCloud } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  credits: string;
  tags: string[];
  createdAt: number;
  data: any;
}

interface MyProjectsProps {
  token: string | null;
  onBack: () => void;
  onLoadProject: (project: Project) => void;
}

export const MyProjects: React.FC<MyProjectsProps> = ({ token, onBack, onLoadProject }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch('/api/my-projects', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setProjects(data.projects);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Impossibile caricare i progetti.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [token]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Delete button clicked for project:", id);
    if (!token) {
      console.log("No token found");
      return;
    }
    
    alert("Provo a eliminare il progetto...");
    const confirmed = window.confirm("Sei sicuro di voler eliminare questo progetto? L'azione è irreversibile.");
    if (!confirmed) return;
    
    setActionLoading(id);
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const result = await res.json();
      console.log("Delete response:", res.status, result);
      
      if (res.ok) {
        setProjects(prev => prev.filter(p => p.id !== id));
      } else {
        alert(`Errore: ${result.error || "Impossibile eliminare il progetto."}`);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Errore di rete durante l'eliminazione.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDuplicate = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!token) return;
    
    setActionLoading(`dup-${id}`);
    try {
      const res = await fetch(`/api/projects/${id}/duplicate`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchProjects();
      }
    } catch (err) {
      alert("Errore durante la duplicazione.");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        <p className="text-gray-500 font-medium">Caricamento dei tuoi progetti...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-2 transition group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Torna all'Editor
          </button>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <FolderOpen className="w-7 h-7 text-blue-500" />
            I Miei Progetti
          </h1>
        </div>
        <div className="text-sm text-gray-500 font-medium">
          {projects.length} {projects.length === 1 ? 'progetto salvato' : 'progetti salvati'}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl mb-6">
          {error}
        </div>
      )}

      {projects.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FolderOpen className="w-8 h-8 text-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Non hai ancora salvato nulla</h3>
          <p className="text-gray-500 mb-6">Crea il tuo primo progetto nell'editor e pubblicalo per vederlo qui!</p>
          <button 
            onClick={onBack}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            Inizia a creare
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col"
            >
              <div className="p-5 flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex gap-1">
                    <button
                      onClick={(e) => handleDuplicate(project.id, e)}
                      disabled={actionLoading === `dup-${project.id}`}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="Duplica progetto"
                    >
                      {actionLoading === `dup-${project.id}` ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <label 
                      htmlFor={`thumb-${project.id}`}
                      className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition cursor-pointer"
                      title="Cambia copertina"
                    >
                      <UploadCloud className="w-4 h-4" />
                      <input 
                        type="file" 
                        id={`thumb-${project.id}`} 
                        className="hidden" 
                        accept="image/*"
                        onChange={async (e) => {
                          if (e.target.files && e.target.files[0]) {
                            const reader = new FileReader();
                            reader.onload = async (event) => {
                              if (event.target?.result) {
                                setActionLoading(`thumb-${project.id}`);
                                try {
                                    const res = await fetch(`/api/projects/${project.id}/thumbnail`, {
                                        method: 'POST',
                                        headers: { 
                                            'Authorization': `Bearer ${token}`,
                                            'Content-Type': 'application/json' 
                                        },
                                        body: JSON.stringify({ thumbnail: event.target?.result })
                                    });
                                    if (res.ok) {
                                        fetchProjects();
                                    } else {
                                        alert("Errore durante il caricamento della copertina.");
                                    }
                                } catch (err) {
                                    alert("Errore di rete.");
                                } finally {
                                    setActionLoading(null);
                                }
                              }
                            };
                            reader.readAsDataURL(e.target.files[0]);
                          }
                        }}
                      />
                    </label>
                    <button
                      onClick={(e) => handleDelete(project.id, e)}
                      disabled={actionLoading === project.id}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Elimina progetto"
                    >
                      {actionLoading === project.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2 mb-4 h-10 italic">
                  {project.description || "Nessuna descrizione fornita."}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags && project.tags.length > 0 ? (
                    project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider rounded-md">
                        <Tag className="w-2.5 h-2.5" />
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-[10px] text-gray-400 font-medium italic">Senza tag</span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                  <Calendar className="w-3 h-3" />
                  {new Date(project.createdAt).toLocaleDateString('it-IT', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              </div>

              <div className="p-3 bg-gray-50 border-t border-gray-100">
                <button
                  onClick={() => onLoadProject(project)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold text-sm rounded-xl hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all group/btn shadow-sm"
                >
                  <Play className="w-4 h-4 group-hover/btn:fill-current" />
                  Apri nell'Editor
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
