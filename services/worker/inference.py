import numpy as np
import cv2
import os

class Tiler:
    def __init__(self, tile_size=640, overlap=0.2):
        self.tile_size = tile_size
        self.overlap = overlap
        self.stride = int(tile_size * (1 - overlap))

    def get_tiles(self, image):
        """
        Görüntüyü tile'lara böler ve her tile için (y, x, w, h) bilgisini döner.
        """
        h, w = image.shape[:2]
        tiles = []
        
        for y in range(0, h - self.tile_size + 1, self.stride):
            for x in range(0, w - self.tile_size + 1, self.stride):
                tile = image[y:y+self.tile_size, x:x+self.tile_size]
                tiles.append({
                    "data": tile,
                    "coords": (x, y, self.tile_size, self.tile_size)
                })
        
        # Son satır/sütun kalıyorsa onları da ekle (padding yerine kaydırma)
        if h % self.stride != 0:
            # Eksik kalan kısım için son bir satır tara
            y = h - self.tile_size
            for x in range(0, w - self.tile_size + 1, self.stride):
                tile = image[y:y+self.tile_size, x:x+self.tile_size]
                tiles.append({"data": tile, "coords": (x, y, self.tile_size, self.tile_size)})
                
        return tiles

class InferenceEngine:
    def __init__(self, model_path=None):
        self.model_path = model_path
        # Gerçek uygulamada TensorRT/ONNX Runtime burada yüklenir
        print(f"AI Motoru Hazırlandı: {model_path if model_path else 'Mock Model'}")

    async def infer(self, tile_data):
        """
        Tek bir tile üzerinde çıkarım yapar.
        Simulation: Rastgele bitki tespiti döner.
        """
        # YOLO formatında çıktı: [x_center, y_center, w, h, confidence, class_id]
        num_detections = np.random.randint(2, 8)
        detections = []
        
        for _ in range(num_detections):
            det = {
                "bbox": [
                    np.random.randint(0, 640), 
                    np.random.randint(0, 640),
                    np.random.randint(20, 50),
                    np.random.randint(20, 50)
                ],
                "conf": np.random.uniform(0.6, 0.98),
                "class_id": 0 # 0: Beet
            }
            detections.append(det)
            
        return detections

def apply_global_nms(detections, threshold=0.45):
    """
    Tüm tile'lardan gelen tespitleri birleştirir ve NMS uygular.
    """
    if not detections:
        return []
    
    # Gerçek NMS mantığı burada OpenCV veya custom implemented olarak çalışacak
    # Şimdilik basitleştirilmiş bir filtreleme yapıyoruz
    return detections[:int(len(detections) * 0.8)] # Simülasyon: %20 mükerrer temizliği
