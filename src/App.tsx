import React, { useState } from 'react';

export default function HafavilhaUltra() {
  const [apps, setApps] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Jogo');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [video, setVideo] = useState<string | null>(null);
  const [gameFile, setGameFile] = useState<{name: string, url: string} | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 4).map(file => URL.createObjectURL(file));
      setPhotos(filesArray);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideo(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleFileDownloadUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setGameFile({ name: file.name, url: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const appData = { 
      id: isEditing || Date.now(), 
      name, category, description, photos, video, gameFile 
    };

    if (isEditing !== null) {
      setApps(apps.map(app => app.id === isEditing ? appData : app));
      setIsEditing(null);
    } else {
      setApps([...apps, appData]);
    }

    setName(''); setDescription(''); setPhotos([]); setVideo(null); setGameFile(null);
  };

  const startEdit = (app: any) => {
    setIsEditing(app.id);
    setName(app.name);
    setCategory(app.category);
    setDescription(app.description);
    setPhotos(app.photos);
    setVideo(app.video);
    setGameFile(app.gameFile);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#020617] text-[#00f5ff] p-4 font-sans" style={{ backgroundColor: '#020617', color: '#00f5ff', minHeight: '100vh' }}>
      <header className="max-w-6xl mx-auto border-b border-[#00f5ff] pb-4 mb-8">
        <h1 className="text-3xl font-black italic">HAFY STORE - ULTRA 🚀</h1>
      </header>

      <main className="max-w-4xl mx-auto">
        <section className="bg-slate-900 border-2 border-[#00f5ff] p-6 rounded-3xl mb-12 shadow-[0_0_20px_rgba(0,245,255,0.2)]">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            {isEditing ? '✏️ EDITAR POSTAGEM' : '➕ CRIAR NOVA POSTAGEM'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Nome do Aplicativo/Jogo" className="bg-black border border-[#00f5ff] p-3 rounded-xl outline-none text-white" required />
              <select value={category} onChange={e => setCategory(e.target.value)} className="bg-black border border-[#00f5ff] p-3 rounded-xl outline-none text-white">
                <option>Jogo</option><option>App</option><option>Livro</option><option>Filme</option><option>Série</option>
              </select>
            </div>

            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição detalhada..." className="w-full bg-black border border-[#00f5ff] p-3 rounded-xl h-24 outline-none text-white" required />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm flex items-center gap-2">🖼️ 4 Fotos (Amostra)</label>
                <input type="file" multiple accept="image/*" onChange={handlePhotoUpload} className="text-xs text-gray-400" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm flex items-center gap-2">🎬 Vídeo (Trailer)</label>
                <input type="file" accept="video/*" onChange={handleVideoUpload} className="text-xs text-gray-400" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm flex items-center gap-2">📦 Arquivo (Game/Zip)</label>
                <input type="file" onChange={handleFileDownloadUpload} className="text-xs text-gray-400" />
              </div>
            </div>

            <button type="submit" className="w-full py-4 bg-[#00f5ff] text-black font-black rounded-2xl hover:scale-105 transition-all shadow-[0_0_15px_#00f5ff]">
              {isEditing ? 'SALVAR ALTERAÇÕES ✏️' : 'PUBLICAR NA HAFY STORE 🏁'}
            </button>
          </form>
        </section>

        <div className="grid grid-cols-1 gap-8">
          {apps.map(app => (
            <div key={app.id} className="bg-slate-900 border border-[#00f5ff] rounded-3xl overflow-hidden shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="bg-[#00f5ff] text-black text-[10px] font-bold px-2 py-1 rounded-full uppercase">{app.category}</span>
                  <h3 className="text-2xl font-black mt-2">{app.name}</h3>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(app)} className="p-2 border border-yellow-400 text-yellow-400 rounded-lg">✏️</button>
                  <button onClick={() => setApps(apps.filter(a => a.id !== app.id))} className="p-2 border border-red-500 text-red-500 rounded-lg">🗑️</button>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">{app.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
