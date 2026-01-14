'use client';

import { useState } from 'react';
import { Plus, Image as ImageIcon, Calendar, User, Trash2, X, Upload, Heart } from 'lucide-react';
import { usePhotos, useUsers } from '@/hooks/useLocalDB';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientBadge } from '@/components/ui/GradientBadge';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export default function PhotosPage() {
  const { data: photos, loading, create, update, remove } = usePhotos();
  const { data: users } = useUsers();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);

  const [newPhoto, setNewPhoto] = useState({
    url: '',
    caption: '',
    uploadedBy: 'sarah',
    tags: [] as string[],
  });

  const samplePhotos = [
    'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800',
    'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800',
    'https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?w=800',
    'https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?w=800',
  ];

  const commonTags = [
    '👪 Family', '🎉 Celebration', '🏖️ Vacation', '🎂 Birthday',
    '🏠 Home', '🌳 Nature', '🎨 Creative', '⚽ Sports',
    '🍽️ Food', '🐾 Pets', '🎓 School', '❤️ Love'
  ];

  const handleCreate = () => {
    if (!newPhoto.url || !newPhoto.caption) return;

    create({
      url: newPhoto.url,
      caption: newPhoto.caption,
      uploadedBy: newPhoto.uploadedBy,
      tags: newPhoto.tags,
      familyId: 'demo_family_1',
      likes: [],
      createdAt: new Date().toISOString(),
    });

    setNewPhoto({
      url: '',
      caption: '',
      uploadedBy: 'sarah',
      tags: [],
    });
    setShowAddModal(false);
  };

  const handleDelete = (photoId: string) => {
    if (confirm('Are you sure you want to delete this photo?')) {
      remove(photoId);
      setSelectedPhoto(null);
    }
  };

  const handleLike = (photoId: string, currentLikes: string[]) => {
    const userId = 'sarah'; // Current user
    const newLikes = currentLikes.includes(userId)
      ? currentLikes.filter(id => id !== userId)
      : [...currentLikes, userId];
    update(photoId, { likes: newLikes });
  };

  const toggleTag = (tag: string) => {
    setNewPhoto({
      ...newPhoto,
      tags: newPhoto.tags.includes(tag)
        ? newPhoto.tags.filter(t => t !== tag)
        : [...newPhoto.tags, tag],
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white">
            Family Photos
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {photos.length} memories captured
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Add Photo
        </Button>
      </div>

      {/* Photo Gallery */}
      {photos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {photos.map(photo => {
            const uploader = users.find(u => u._id === photo.uploadedBy);
            return (
              <GlassCard
                key={photo._id}
                className="overflow-hidden cursor-pointer hover-lift group"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="font-semibold line-clamp-2">{photo.caption}</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{uploader?.avatar || '👤'}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {uploader?.name || 'Unknown'}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(photo._id, photo.likes || []);
                      }}
                      className="flex items-center gap-1 text-sm"
                    >
                      <Heart
                        className={cn(
                          'w-5 h-5',
                          photo.likes?.includes('sarah')
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-400'
                        )}
                      />
                      <span className="text-gray-600 dark:text-gray-400">
                        {photo.likes?.length || 0}
                      </span>
                    </button>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      ) : (
        <GlassCard className="p-12 text-center">
          <ImageIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No photos yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Start capturing your family's precious moments!
          </p>
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="w-5 h-5 mr-2" />
            Add Photo
          </Button>
        </GlassCard>
      )}

      {/* Photo Detail Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="w-full max-w-4xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="aspect-video bg-black relative">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                  {selectedPhoto.caption}
                </h3>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <User className="w-4 h-4" />
                    <span>{users.find(u => u._id === selectedPhoto.uploadedBy)?.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLike(selectedPhoto._id, selectedPhoto.likes || [])}
                      className="flex items-center gap-2"
                    >
                      <Heart
                        className={cn(
                          'w-6 h-6',
                          selectedPhoto.likes?.includes('sarah')
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-400'
                        )}
                      />
                      <span className="text-gray-600 dark:text-gray-400 font-semibold">
                        {selectedPhoto.likes?.length || 0}
                      </span>
                    </button>
                    <button
                      onClick={() => handleDelete(selectedPhoto._id)}
                      className="p-2 hover:bg-error-50 dark:hover:bg-error-900/20 rounded-lg transition-colors text-error-500"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                {selectedPhoto.tags && selectedPhoto.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedPhoto.tags.map((tag: string) => (
                      <GradientBadge key={tag} variant="purple">
                        {tag}
                      </GradientBadge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Photo Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-lg animate-scale-in">
            <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              {/* Gradient Header */}
              <div className="relative h-32 bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-transparent to-indigo-500/20" />
                <button
                  onClick={() => setShowAddModal(false)}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white transition-all hover:scale-110 active:scale-95"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute -bottom-8 left-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl flex items-center justify-center border-4 border-white dark:border-gray-900">
                    <ImageIcon className="w-8 h-8 text-pink-500" strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 pt-14 max-h-[calc(90vh-8rem)] overflow-y-auto custom-scrollbar">
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                  Add Photo
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Share a special moment with your family
                </p>

                <div className="space-y-6">
                  {/* Photo URL */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                      Photo URL <span className="text-error-500">*</span>
                    </label>
                    <input
                      type="url"
                      value={newPhoto.url}
                      onChange={(e) => setNewPhoto({ ...newPhoto, url: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 font-medium"
                      placeholder="https://example.com/photo.jpg"
                      autoFocus
                    />
                  </div>

                  {/* Quick Select Sample Photos */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                      Or select a sample photo
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {samplePhotos.map((url, idx) => (
                        <button
                          key={idx}
                          onClick={() => setNewPhoto({ ...newPhoto, url })}
                          className={cn(
                            'aspect-square rounded-xl overflow-hidden border-2 transition-all',
                            newPhoto.url === url
                              ? 'border-primary-500 scale-95'
                              : 'border-transparent hover:border-gray-300'
                          )}
                        >
                          <img src={url} alt={`Sample ${idx + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                      Caption <span className="text-error-500">*</span>
                    </label>
                    <textarea
                      value={newPhoto.caption}
                      onChange={(e) => setNewPhoto({ ...newPhoto, caption: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 min-h-[80px] resize-none"
                      placeholder="Describe this moment..."
                    />
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                      Tags
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {commonTags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={cn(
                            'px-3 py-2 rounded-xl font-medium transition-all text-sm text-left',
                            newPhoto.tags.includes(tag)
                              ? 'bg-primary-500 text-white'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                          )}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-8 py-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800">
                <div className="flex gap-3">
                  <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleCreate}
                    disabled={!newPhoto.url || !newPhoto.caption}
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Photo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
