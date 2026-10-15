import React, { useEffect, useState } from 'react';
import { Play, Download, Clock, User, ArrowLeft } from 'lucide-react';
import { AzuroIcon } from './AzuroIcon';

interface Project {
  id: string;
  title: string;
  authorName: string;
  data: object;
  createdAt: number;
}

interface ExploreProjectsProps {
  onLoadProject: (data: object, title: string) => void;
  onBack: () => void;
}

export const ExploreProjects: React.FC<ExploreProjectsProps> = ({ onLoadProject, onBack }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (data.projects) {
          setProjects(data.projects);
        }
      } catch (err) {
        console.error("Failed to load projects", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition shadow-sm"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <AzuroIcon className="w-10 h-10" />
            Esplora Progetti
          </h1>
          <p className="text-gray-500 mt-1 text-sm">Scopri i fantastici progetti creati dalla community di MicioCode.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <AzuroIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <h2 className="text-xl font-medium text-gray-700">Nessun progetto ancora</h2>
          <p className="text-gray-500 mt-2">Sii il primo a pubblicare un progetto MicioCode!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((proj) => (
            <div key={proj.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition flex flex-col group">
              <div className="h-32 bg-gradient-to-br from-blue-100 to-indigo-50 flex items-center justify-center relative overflow-hidden">
                <AzuroIcon className="w-16 h-16 transform group-hover:scale-110 transition duration-300" />
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <h3 className="font-semibold text-lg text-gray-900 truncate mb-1">{proj.title}</h3>
                <div className="flex items-center text-sm text-gray-500 mb-4 gap-4">
                  <span className="flex items-center gap-1"><User className="w-4 h-4"/> {proj.authorName}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4"/> {new Date(proj.createdAt).toLocaleDateString()}</span>
                </div>
                
                <div className="mt-auto pt-4 border-t border-gray-100 flex gap-2">
                  <button 
                    onClick={() => onLoadProject(proj.data, proj.title)}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 py-2 rounded-lg text-sm font-medium transition"
                  >
                    <Play className="w-4 h-4" />
                    Apri & Gioca
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
