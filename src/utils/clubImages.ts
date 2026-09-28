import driver from "../assets/clubs/driver.svg";
import wood from "../assets/clubs/wood.svg";
import hybrid from "../assets/clubs/hybrid.svg";
import iron from "../assets/clubs/iron.svg";
import wedge from "../assets/clubs/wedge.svg";
import putter from "../assets/clubs/putter.svg";

// Canonical club type names. These are stored verbatim in Firestore (as doc
// IDs under users/{uid}/clubs/) and used by AddClubDialog's dropdowns.
export const METALWOODS = ["Driver", "3-Wood", "5-Wood", "7-Wood", "3-Hybrid", "5-Hybrid"];
export const IRONS = ["1-Iron", "2-Iron", "3-Iron", "4-Iron", "5-Iron", "6-Iron", "7-Iron", "8-Iron", "9-Iron"];
export const WEDGES = ["Pitching Wedge", "Gap Wedge", "Sand Wedge", "Lob Wedge", "50-Degree", "52-Degree", "56-Degree", "60-Degree"];
export const PUTTERS = ["Putter"];

export type ClubCategory = "driver" | "wood" | "hybrid" | "iron" | "wedge" | "putter" | "unknown";

const CATEGORY_IMAGES: Record<Exclude<ClubCategory, "unknown">, string> = {
    driver,
    wood,
    hybrid,
    iron,
    wedge,
    putter,
};

const UNKNOWN_IMAGE = iron;

/**
 * Maps a club type (e.g. "7-Iron", "Sand Wedge") to its club-category image.
 * Matching is case-insensitive and tolerant of space/dash differences so
 * values like "5 wood", "5-Wood", and "5Wood" all resolve.
 */
export function getClubCategory(clubType: string): ClubCategory {
    const t = clubType.toLowerCase().replace(/[\s_-]+/g, "");
    if (t === "putter") return "putter";
    if (t === "driver") return "driver";
    if (t.endsWith("wood")) return "wood";
    if (t.endsWith("hybrid")) return "hybrid";
    if (t.endsWith("iron")) return "iron";
    if (t.endsWith("wedge") || /^\d+degree$/.test(t)) return "wedge";
    return "unknown";
}

/**
 * Returns the image for a club type, falling back to a generic club image
 * for unknown values.
 */
export function getClubImage(clubType: string): string {
    const category = getClubCategory(clubType);
    if (category === "unknown") return UNKNOWN_IMAGE;
    return CATEGORY_IMAGES[category];
}

// Kept for parity with AddClubDialog's option lists in case other code
// needs the canonical club type names.
export const CLUB_TYPES = { METALWOODS, IRONS, WEDGES, PUTTERS };
