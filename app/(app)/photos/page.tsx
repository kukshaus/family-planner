'use client';

import { useState } from 'react';
import { Plus, Upload, FolderOpen, Heart, Download, Share2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function PhotosPage() {
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [lightboxPhoto, setLightboxPhoto] = useState<string | null>(null);

  // Mock albums data
  const albums = [
    {
      id: 'all',
      name: 'All Photos',
      count: 247,
      coverPhoto: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400',
    },
    {
      id: '1',
      name: 'Summer 2025',
      count: 89,
      coverPhoto: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=400',
    },
    {
      id: '2',
      name: 'Birthday Parties',
      count: 45,
      coverPhoto: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400',
    },
    {
      id: '3',
      name: 'Family Trips',
      count: 78,
      coverPhoto: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=400',
    },
    {
      id: '4',
      name: 'School Events',
      count: 35,
      coverPhoto: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400',
    },
  ];

  // Mock photos data
  const photos = [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400',
      caption: 'Emma\'s 8th Birthday Party',
      date: new Date(2025, 11, 15),
      tags: ['Emma', 'Birthday'],
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=400',
      caption: 'Beach Day Fun',
      date: new Date(2025, 7, 22),
      tags: ['Family', 'Summer'],
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=400',
      caption: 'Park Adventure',
      date: new Date(2025, 9, 10),
      tags: ['Kids', 'Outdoor'],
    },
    {
      id: '4',
      url: 'https://images.unsplash.com/photo-1543168256-418811576931?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1543168256-418811576931?w=400',
      caption: 'Game Night',
      date: new Date(2025, 10, 5),
      tags: ['Family', 'Indoor'],
    },
    {
      id: '5',
      url: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400',
      caption: 'Soccer Championship',
      date: new Date(2025, 10, 20),
      tags: ['Jake', 'Sports'],
    },
    {
      id: '6',
      url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400',
      caption: 'First Day of School',
      date: new Date(2025, 8, 1),
      tags: ['Emma', 'Jake', 'School'],
    },
    {
      id: '7',
      url: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=400',
      caption: 'Hiking Adventure',
      date: new Date(2025, 6, 14),
      tags: ['Family', 'Nature'],
    },
    {
      id: '8',
      url: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400',
      caption: 'Baking Together',
      date: new Date(2025, 11, 24),
      tags: ['Family', 'Kitchen'],
    },
  ];

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">
            Photos & Memories
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Store and organize your precious family moments
          </p>
        </div>
        <Button>
          <Upload className="w-5 h-5 mr-2" />
          Upload Photos
        </Button>
      </div>

      {/* Albums */}
      <div>
        <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">
          Albums
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {albums.map((album) => (
            <Card
              key={album.id}
              hover
              padding="none"
              className={`cursor-pointer ${
                selectedAlbum === album.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedAlbum(album.id)}
            >
              <div className="aspect-square relative overflow-hidden rounded-t-card-mobile sm:rounded-t-card-desktop">
                <img
                  src={album.coverPhoto}
                  alt={album.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <Badge variant="neutral" size="sm" className="bg-white/90 text-gray-900">
                    {album.count} photos
                  </Badge>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-gray-900 dark:text-white">{album.name}</h3>
              </div>
            </Card>
          ))}
          <Card
            hover
            padding="none"
            className="cursor-pointer bg-gradient-sunset text-white flex items-center justify-center min-h-[200px]"
          >
            <div className="text-center p-4">
              <Plus className="w-12 h-12 mx-auto mb-2" />
              <p className="font-semibold">Create Album</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Photo Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white">
            Recent Photos
          </h2>
          <Button variant="ghost" size="sm">
            <FolderOpen className="w-4 h-4 mr-2" />
            Manage
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => setLightboxPhoto(photo.url)}
            >
              <img
                src={photo.thumbnail}
                alt={photo.caption}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <p className="text-white text-sm font-semibold mb-1">{photo.caption}</p>
                <p className="text-white/80 text-xs">
                  {photo.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
                <div className="flex gap-2 mt-3">
                  <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                    <Heart className="w-4 h-4 text-white" />
                  </button>
                  <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                    <Share2 className="w-4 h-4 text-white" />
                  </button>
                  <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                    <Download className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxPhoto(null)}
        >
          <div className="relative max-w-5xl w-full">
            <img
              src={lightboxPhoto}
              alt="Full size"
              className="w-full h-auto rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setLightboxPhoto(null)}
              className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
            >
              <span className="text-white text-2xl">×</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
