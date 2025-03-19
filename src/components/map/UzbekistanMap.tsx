import React, { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import Overlay from 'ol/Overlay';
import 'ol/ol.css';

import { AccessLevel, WaterObject, WaterBody } from '../../types/government';

// Центр Узбекистана
const CENTER = fromLonLat([64.5853, 41.3775]);
const DEFAULT_ZOOM = 6;

interface UzbekistanMapProps {
  accessLevel: AccessLevel;
  waterObjects: WaterObject[];
  waterBodies: WaterBody[];
  onObjectClick: (object: WaterObject) => void;
  selectedObject?: string;
}

export default function UzbekistanMap({
  accessLevel,
  waterObjects,
  waterBodies,
  onObjectClick,
  selectedObject
}: UzbekistanMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const overlaysRef = useRef<{ [key: string]: Overlay }>({});
  const currentOverlay = useRef<string | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Создаем слой для базовой карты (OpenStreetMap)
    const baseLayer = new TileLayer({
      source: new OSM()
    });

    // Создаем слой для водных объектов
    const waterObjectsSource = new VectorSource();
    const waterObjectsLayer = new VectorLayer({
      source: waterObjectsSource
    });

    // Создаем слой для рек и озер
    const waterBodiesSource = new VectorSource();
    const waterBodiesLayer = new VectorLayer({
      source: waterBodiesSource
    });

    // Инициализируем карту
    const map = new Map({
      target: mapRef.current,
      layers: [baseLayer, waterBodiesLayer, waterObjectsLayer],
      view: new View({
        center: CENTER,
        zoom: DEFAULT_ZOOM
      })
    });

    mapInstanceRef.current = map;

    // Добавляем обработчики событий
    const handleClick = (event: any) => {
      const feature = map.forEachFeatureAtPixel(event.pixel, (feature) => feature);
      if (feature) {
        const objectId = feature.get('id');
        const object = waterObjects.find(obj => obj.id === objectId);
        if (object) {
          onObjectClick(object);
        }
      }
    };

    const handlePointerMove = (event: any) => {
      if (event.dragging) return;

      const pixel = map.getEventPixel(event.originalEvent);
      const hit = map.hasFeatureAtPixel(pixel);
      map.getTargetElement().style.cursor = hit ? 'pointer' : '';

      const feature = map.forEachFeatureAtPixel(pixel, (feature) => feature);
      
      // Скрываем предыдущий оверлей
      if (currentOverlay.current && (!feature || feature.get('id') !== currentOverlay.current)) {
        const overlay = overlaysRef.current[currentOverlay.current];
        if (overlay) {
          overlay.getElement()!.style.display = 'none';
        }
        currentOverlay.current = null;
      }

      // Показываем новый оверлей
      if (feature) {
        const objectId = feature.get('id');
        if (objectId && overlaysRef.current[objectId]) {
          overlaysRef.current[objectId].getElement()!.style.display = 'block';
          currentOverlay.current = objectId;
        }
      }
    };

    map.on('click', handleClick);
    map.on('pointermove', handlePointerMove);

    return () => {
      const overlays = overlaysRef.current;
      map.un('click', handleClick);
      map.un('pointermove', handlePointerMove);
      map.setTarget(undefined);
      Object.values(overlays).forEach(overlay => {
        map.removeOverlay(overlay);
      });
    };
  }, [waterObjects, onObjectClick]);

  // Обновляем объекты на карте
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const map = mapInstanceRef.current;
    const waterObjectsLayer = map.getLayers().getArray()[2] as VectorLayer<VectorSource>;
    const source = waterObjectsLayer.getSource();

    // Очищаем текущие объекты
    source?.clear();

    // Добавляем водные объекты
    waterObjects.forEach(object => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([object.location.lng, object.location.lat])),
        id: object.id,
        name: object.name,
        type: object.type,
        status: object.status
      });

      feature.setStyle(new Style({
        image: new CircleStyle({
          radius: 8,
          fill: new Fill({ color: getObjectColor(object.status) }),
          stroke: new Stroke({
            color: selectedObject === object.id ? '#00ff00' : '#ffffff',
            width: 2
          })
        })
      }));

      source?.addFeature(feature);

      // Создаем всплывающее окно
      const element = document.createElement('div');
      element.className = 'ol-popup';
      element.innerHTML = `
        <div class="bg-white text-black p-2 rounded shadow-lg">
          <h3 class="font-bold">${object.name}</h3>
          <p>Тип: ${object.type}</p>
          <p>Статус: ${object.status}</p>
        </div>
      `;
      element.style.display = 'none';

      const overlay = new Overlay({
        element: element,
        positioning: 'bottom-center',
        offset: [0, -10],
        position: fromLonLat([object.location.lng, object.location.lat])
      });

      overlaysRef.current[object.id] = overlay;
      map.addOverlay(overlay);
    });
  }, [waterObjects, selectedObject]);

  // Обновляем водные объекты (реки и озера)
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const map = mapInstanceRef.current;
    const waterBodiesLayer = map.getLayers().getArray()[1] as VectorLayer<VectorSource>;
    const source = waterBodiesLayer.getSource();

    // Очищаем текущие объекты
    source?.clear();

    // Добавляем реки и озера
    waterBodies.forEach(body => {
      if (body.type === 'river') {
        const coordinates = body.coordinates.map(coord => fromLonLat(coord));
        const feature = new Feature({
          geometry: new LineString(coordinates),
          name: body.name,
          type: body.type
        });

        feature.setStyle(new Style({
          stroke: new Stroke({
            color: '#00ffff',
            width: 2
          })
        }));

        source?.addFeature(feature);
      } else if (body.type === 'lake') {
        const feature = new Feature({
          geometry: new Point(fromLonLat(body.coordinates[0])),
          name: body.name,
          type: body.type
        });

        feature.setStyle(new Style({
          image: new CircleStyle({
            radius: 10,
            fill: new Fill({ color: 'rgba(0, 255, 255, 0.6)' }),
            stroke: new Stroke({
              color: '#ffffff',
              width: 2
            })
          })
        }));

        source?.addFeature(feature);
      }
    });
  }, [waterBodies]);

  return (
    <div ref={mapRef} className="w-full h-full rounded-lg overflow-hidden" />
  );
}

function getObjectColor(status: WaterObject['status']): string {
  switch (status) {
    case 'active':
      return '#00ff00';
    case 'maintenance':
      return '#ffff00';
    case 'offline':
      return '#ff0000';
    case 'construction':
      return '#ff8c00';
    default:
      return '#808080';
  }
} 