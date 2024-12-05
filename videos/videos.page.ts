import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideosService } from '../services/videos.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {
  videos: any[] = [];
  videoSeleccionado: { titulo: string; url: SafeResourceUrl } | null = null;

  constructor(private videosService: VideosService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.obtenerVideos();
  }

  obtenerVideos() {
    this.videosService.obtenerVideos().subscribe({
      next: (response) => {
        console.log('Videos obtenidos:', response);
        this.videos = response.map((video: any) => ({
          ...video,
          safeUrl: this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${video.url}`),
        }));
      },
      error: (error) => {
        console.error('Error al obtener los videos:', error);
      },
    });
  }

  reproducirVideo(video: any) {
    this.videoSeleccionado = {
      titulo: video.titulo,
      url: video.safeUrl,
    };
  }

  cerrarVideo() {
    this.videoSeleccionado = null;
  }
}
