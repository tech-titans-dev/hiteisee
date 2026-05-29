export interface GalleryImage {
  id: number;
  title: string;
  src: string;
  category?: string;
}

const STORAGE_KEY = "hiteisee_gallery_images";

// Default images that ship with the app
const defaultGalleryImages: GalleryImage[] = [
  { id: 1, title: "Event Highlight", src: "/gallery/10001.png", category: "Events" },
  { id: 2, title: "Odisha CSR Conclave", src: "/gallery/10002.jpg", category: "Conclaves" },
  { id: 3, title: "Smart Infra", src: "/gallery/10003.jpg", category: "Events" },
  { id: 4, title: "CII IR Conclave", src: "/gallery/10004.jpg", category: "Conclaves" },
  { id: 5, title: "Apprentices Workshop 16.9.2015", src: "/gallery/10005.jpg", category: "Workshops" },
  { id: 6, title: "The Art & Science of Decision Making during 12-13 December 2019", src: "/gallery/10006.jpg", category: "Speaking" },
  { id: 7, title: "TISS - Mahatransco MDP 10-12 Feb 2020", src: "/gallery/10007.jpg", category: "Workshops" },
  { id: 8, title: "TISS MDP 18-20.9.19", src: "/gallery/10008.jpg", category: "Workshops" },
  { id: 9, title: "ZACL - Karishye - towards Execution excellence, 14-15 Sep, 2017", src: "/gallery/10009.jpg", category: "Speaking" },
  { id: 10, title: "NPC - POSH, Chennai, 6-8, June, 2018", src: "/gallery/10010.jpg", category: "Speaking" },
  { id: 11, title: "OHPC - Corporate Effectiveness, 3-4 Feb, 2017", src: "/gallery/10011.jpg", category: "Workshops" },
  { id: 12, title: "OHPC - Behaviour Management & Communication Skill, 12 May, 2017", src: "/gallery/10012.jpg", category: "Workshops" },
  { id: 13, title: "NPC - Improving Effectiveness for PA-PS, 11 Oct, 2017", src: "/gallery/10013.jpg", category: "Workshops" },
  { id: 14, title: "MCL - Mentoring Workshop, 1-2 Aug, 2018", src: "/gallery/10014.jpg", category: "Workshops" },
  { id: 15, title: "MCL-2 - Mentoring, 1-2 Aug, 2018", src: "/gallery/10015.jpg", category: "Workshops" },
  { id: 16, title: "ICAI students on 5 Feb 2016 during the Orientation prog", src: "/gallery/10016.jpg", category: "Events" },
  { id: 17, title: "on Are you Happy for Friends for Life, Bhubaneswar on 6 Aug, 2017", src: "/gallery/10017.jpg", category: "Events" },
  { id: 18, title: "24 July 2012 CII TU prog", src: "/gallery/10018.jpg", category: "Speaking" },
  { id: 19, title: "13-15 Sep 2017 AMDISA team to XIMB Univ", src: "/gallery/10019.jpg", category: "Speaking" },
  { id: 20, title: "2017 AMDISA Team to XIMB Univ", src: "/gallery/10020.jpg", category: "Events" },
  { id: 21, title: "ICC Sustainability Conclave 2016", src: "/gallery/10021.jpg", category: "Conclaves" },
  { id: 22, title: "CII - 23rd QC Convention 16.12.2010", src: "/gallery/10022.jpg", category: "Speaking" },
  { id: 23, title: "Dr Suvendu Das with Minister at Divine Institute of Engg & technology Baripada", src: "/gallery/10023.jpg", category: "Awards & Guests" },
  { id: 24, title: "Dr. Suvendu as Chief Guest at MICM, Bhubaneswar on 9.11.2016", src: "/gallery/10024.jpg", category: "Awards & Guests" },
  { id: 25, title: "Dr. Suvendu Das conducted MDP for IFCI at New Delhi", src: "/gallery/10025.jpg", category: "Workshops" },
  { id: 26, title: "MayFair Hotels - Vivartana - 12.9.2017", src: "/gallery/10026.jpg", category: "Events" },
  { id: 27, title: "Dr Suvendu Das taking over as President of RCB Heritage on 29.7.2024", src: "/gallery/10027.jpg", category: "Awards & Guests" },
  { id: 28, title: "30 June 2018 PMIR UU Intl seminar", src: "/gallery/10028.jpg", category: "Speaking" },
];

/** Get all gallery images from localStorage, falling back to defaults */
export function getGalleryImages(): GalleryImage[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed: GalleryImage[] = JSON.parse(stored);
      // Hydrate existing stored items with categories if they are missing
      const hydrated = parsed.map(img => {
        if (!img.category) {
          const defaultMatch = defaultGalleryImages.find(d => d.src === img.src);
          if (defaultMatch && defaultMatch.category) {
            return { ...img, category: defaultMatch.category };
          }
        }
        return img;
      });
      // Optionally save the hydrated version back to storage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(hydrated));
      return hydrated;
    }
  } catch {
    // ignore parse errors
  }
  // First load — seed with defaults
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultGalleryImages));
  return defaultGalleryImages;
}

/** Save the full gallery images list */
export function saveGalleryImages(images: GalleryImage[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
}

/** Add an image and return the updated list */
export function addGalleryImage(title: string, src: string): GalleryImage[] {
  const images = getGalleryImages();
  const nextId = images.length > 0 ? Math.max(...images.map(i => i.id)) + 1 : 1;
  const updated = [...images, { id: nextId, title, src }];
  saveGalleryImages(updated);
  return updated;
}

/** Remove an image by id and return the updated list */
export function removeGalleryImage(id: number): GalleryImage[] {
  const images = getGalleryImages();
  const updated = images.filter(img => img.id !== id);
  saveGalleryImages(updated);
  return updated;
}
