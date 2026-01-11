"use client";

import { useState, useEffect } from "react";
import { Upload, X, Image as ImageIcon, Video, Star, PlayCircle, Loader2, Trash2 } from "lucide-react";
import { addVideoItem, getPortfolioItems, uploadPhoto, deletePortfolioItem, toggleFeatured, type PortfolioItem } from "./actions";
import imageCompression from 'browser-image-compression';

export default function ProviderPortfolioPage() {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [items, setItems] = useState<PortfolioItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'photo' | 'video'>('all');
    const [selectedMedia, setSelectedMedia] = useState<PortfolioItem | null>(null);

    const fetchItems = async () => {
        try {
            const data = await getPortfolioItems();
            setItems(data);
        } catch (error) {
            console.error("Failed to fetch portfolio:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const filteredItems = items.filter(item => filter === 'all' || item.type === filter);

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm("Are you sure you want to delete this item?")) return;

        // Optimistic update
        const originalItems = [...items];
        setItems(items.filter(item => item.id !== id));

        const result = await deletePortfolioItem(id);
        if (result.error) {
            alert("Failed to delete item");
            setItems(originalItems); // Revert
        }
    };

    const handleFeature = async (id: string, currentStatus: boolean, e: React.MouseEvent) => {
        e.stopPropagation();

        // Optimistic update
        setItems(items.map(item => item.id === id ? { ...item, featured: !currentStatus } : item));

        const result = await toggleFeatured(id, currentStatus);
        if (result.error) {
            // Revert
            setItems(items.map(item => item.id === id ? { ...item, featured: currentStatus } : item));
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">Portfolio</h1>
                    <p className="text-zinc-500">Showcase your best work to attract clients.</p>
                </div>
                <button
                    onClick={() => setIsUploadModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg font-medium hover:bg-zinc-800 transition-colors shadow-sm"
                >
                    <Upload className="w-4 h-4" /> Upload Media
                </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-4 text-sm font-medium border-b border-zinc-200">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 border-b-2 transition-colors ${filter === 'all' ? 'text-indigo-600 border-indigo-600' : 'text-zinc-500 border-transparent hover:text-zinc-900'}`}
                >
                    All Items
                </button>
                <button
                    onClick={() => setFilter('photo')}
                    className={`px-4 py-2 border-b-2 transition-colors ${filter === 'photo' ? 'text-indigo-600 border-indigo-600' : 'text-zinc-500 border-transparent hover:text-zinc-900'}`}
                >
                    Photos
                </button>
                <button
                    onClick={() => setFilter('video')}
                    className={`px-4 py-2 border-b-2 transition-colors ${filter === 'video' ? 'text-indigo-600 border-indigo-600' : 'text-zinc-500 border-transparent hover:text-zinc-900'}`}
                >
                    Videos
                </button>
            </div>

            {/* Media Grid */}
            {isLoading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredItems.map((item) => (
                        <div
                            key={item.id}
                            className="group relative aspect-square bg-zinc-100 rounded-xl overflow-hidden border border-zinc-200 cursor-pointer"
                            onClick={() => setSelectedMedia(item)}
                        >
                            <img src={item.src} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="" />

                            {item.type === 'video' && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                        <PlayCircle className="w-6 h-6 text-zinc-900 ml-0.5" />
                                    </div>
                                </div>
                            )}

                            {/* Overlay Actions */}
                            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity" onClick={e => e.stopPropagation()}>
                                <div className="flex gap-2">
                                    <button
                                        onClick={(e) => handleFeature(item.id, !!item.featured, e)}
                                        className={`p-1.5 backdrop-blur rounded-lg transition-colors tooltip ${item.featured ? 'bg-yellow-400 text-white' : 'bg-white/20 text-white hover:bg-white/40'}`}
                                        title="Set as featured"
                                    >
                                        <Star className={`w-4 h-4 ${item.featured ? 'fill-current' : ''}`} />
                                    </button>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={(e) => handleDelete(item.id, e)}
                                        className="p-1.5 bg-white/20 backdrop-blur rounded-lg text-white hover:bg-red-500/80 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Type Badge */}
                            <div className="absolute top-2 right-2 px-2 py-1 rounded bg-black/40 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider">
                                {item.type}
                            </div>
                        </div>
                    ))}

                    {/* Upload Placeholder */}
                    <div
                        onClick={() => setIsUploadModalOpen(true)}
                        className="flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-dashed border-zinc-200 hover:border-indigo-400 hover:bg-indigo-50/10 transition-colors cursor-pointer text-center p-4"
                    >
                        <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center mb-3">
                            <Upload className="w-5 h-5 text-zinc-400" />
                        </div>
                        <span className="text-sm font-medium text-zinc-600">Upload Media</span>
                        <span className="text-xs text-zinc-400 mt-1">JPG, PNG, Video URL</span>
                    </div>
                </div>
            )}

            {/* Media Viewer Modal */}
            {selectedMedia && (
                <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setSelectedMedia(null)}>
                    <button
                        onClick={() => setSelectedMedia(null)}
                        className="absolute top-4 right-4 p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    <div className="relative w-full max-w-5xl max-h-[90vh] flex items-center justify-center" onClick={e => e.stopPropagation()}>
                        {selectedMedia.type === 'video' && selectedMedia.youtube_url ? (
                            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${selectedMedia.youtube_url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)?.[1]}?autoplay=1`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : (
                            <div className="relative w-full h-[80vh]">
                                <img
                                    src={selectedMedia.src}
                                    alt="Full View"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}

            {isUploadModalOpen && (
                <UploadModal
                    onClose={() => setIsUploadModalOpen(false)}
                    onSuccess={() => {
                        fetchItems();
                        setIsUploadModalOpen(false);
                    }}
                />
            )}
        </div>
    );
}

function UploadModal({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) {
    const [activeTab, setActiveTab] = useState<'photo' | 'video'>('photo');
    const [preview, setPreview] = useState<string | null>(null);
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [error, setError] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setPreview(url);
        }
    };

    const extractYoutubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const handleYoutubeUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        setYoutubeUrl(url);
        const id = extractYoutubeId(url);
        if (id) {
            setPreview(`https://img.youtube.com/vi/${id}/maxresdefault.jpg`);
            setError('');
        } else {
            setPreview(null);
            if (url) setError('Invalid YouTube URL');
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        setError('');

        try {
            if (activeTab === 'photo') {
                if (!selectedFile) return;

                // Compress image
                const options = {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true,
                }
                const compressedFile = await imageCompression(selectedFile, options);

                const formData = new FormData();
                formData.append('file', compressedFile);

                const result = await uploadPhoto(formData);
                if (result.error) throw new Error(result.error);

            } else {
                if (!preview) return; // Should have thumbnail
                const result = await addVideoItem(youtubeUrl, preview);
                if (result.error) throw new Error(result.error);
            }

            onSuccess();
        } catch (err: any) {
            setError(err.message || 'Failed to save');
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-zinc-100">
                    <h3 className="font-semibold text-zinc-900">Upload Media</h3>
                    <button onClick={onClose} className="p-1 text-zinc-400 hover:text-zinc-600 rounded-lg hover:bg-zinc-100">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-4">
                    <div className="flex gap-2 mb-4 bg-zinc-100 p-1 rounded-lg">
                        <button
                            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'photo' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
                            onClick={() => { setActiveTab('photo'); setPreview(null); setError(''); setSelectedFile(null); }}
                        >
                            <ImageIcon className="w-4 h-4" /> Photo
                        </button>
                        <button
                            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'video' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
                            onClick={() => { setActiveTab('video'); setPreview(null); setError(''); }}
                        >
                            <Video className="w-4 h-4" /> Video
                        </button>
                    </div>

                    <div className="space-y-4">
                        {activeTab === 'photo' ? (
                            <div className="border-2 border-dashed border-zinc-200 rounded-xl p-8 text-center hover:border-indigo-400 hover:bg-indigo-50/10 transition-colors">
                                {preview ? (
                                    <div className="relative aspect-video rounded-lg overflow-hidden">
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            onClick={() => { setPreview(null); setSelectedFile(null); }}
                                            className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black/70"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-3">
                                            <Upload className="w-6 h-6 text-zinc-400" />
                                        </div>
                                        <label className="block text-sm font-medium text-zinc-700 cursor-pointer">
                                            <span className="text-indigo-600 hover:text-indigo-500">Click to upload</span> or drag and drop
                                            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                        </label>
                                        <p className="text-xs text-zinc-500 mt-1">SVG, PNG, JPG or GIF</p>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 mb-1">YouTube URL</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-zinc-50/50"
                                        placeholder="https://youtube.com/watch?v=..."
                                        value={youtubeUrl}
                                        onChange={handleYoutubeUrlChange}
                                    />
                                </div>
                                {preview && (
                                    <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-100 border border-zinc-200">
                                        <img src={preview} alt="Video Thumbnail" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                        )}
                        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                    </div>
                </div>

                <div className="flex items-center justify-between p-4 border-t border-zinc-100 bg-zinc-50/50">
                    <button onClick={onClose} disabled={isSaving} className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 disabled:opacity-50">
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!preview || isSaving || (activeTab === 'video' && !!error)}
                        className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm font-medium hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
