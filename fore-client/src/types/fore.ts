export type Settings = {
    theme: string;
}

export type Club = {
    brand: string;
    model: string;
    clubType: string;
    flex: string;
    shaft: string;
}

export type Address = {
    streetNumber: string;
    street: string;
    city: string;
    country: string;
}

export type Hole = {
    holeNumber: number;
    par: number;
    length: number[];
    handicap: number;
}

export type CompletedHole = Hole & {
    score: number;
}

export type Course = {
    name: string;
    length: number;
    teeBoxes: string[];
    address: Address;
    slope: number;
    courseRtg: number;
    scorecard: Hole[];
    // TODO: implement map and courseLayout features
    // map: CourseMap;
    // courseLayout: CourseLayout;
}

export type CompletedCourse = {

}

export type Game = {
    date: Date;
    // change to { name: string, length: number, courseRating: number, slope: number } once connected to db
    course: string[];
    holes: 9 | 18;
    teeBox: string;
    score: number;
    handicapDifferential: number;
    scorecard: CompletedHole[];
}

// TODO: keep only values needed for handicap calculation
// this will only store last 20 rounds
export type HandicapHistory = {
    
}

export type User = {
    clubs: Club[];
    staredCourses: string[];
    games: Game[];
    handicap: number;
    handicapHistory: HandicapHistory[];
}