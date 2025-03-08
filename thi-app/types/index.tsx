export type Student = {
    id: string;
    name: string;
    age: string;
    abcReports: number;
    durationReports: number;
  };
  
export interface StudentProps {
    student: Student;
  }

export type Event = {
  title: string;
  start: Date;
  end: Date
}

export const grades = [
  { label: "Grade 01", value: "Grade 01" },
  { label: "Grade 02", value: "Grade 02" },
  { label: "Grade 03", value: "Grade 03" },
  { label: "Grade 04", value: "Grade 04" },
];

export const imageUrls = [
    "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L2pvYjY4Ni0yODAtdi5qcGc.jpg",
    "https://images.rawpixel.com/image_social_square/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L2pvYjY4Ni0yODUteC5qcGc.jpg",
    "https://images.rawpixel.com/image_400/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3BkcG9zdGVyMS1sb2MyMDE0NjQ2NzY4Yy1pbWFnZS5qcGc.jpg",
    "https://images.rawpixel.com/image_400/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlMTJfM2RfcmVuZGVyX2NoYXJhY3Rlcl9vZl9wdXBweV9jdXRlX2NhcnRvb25fbmF0dV9jOGVlODQyOC1mM2EyLTQzYjEtODEyZi02MzgzNTcwOTY4YzZfMS5qcGc.jpg",
    "https://images.rawpixel.com/image_400/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTEyL3N0YXJ0dXBpbWFnZXNfY2FydG9vbl9pbGx1c3RyYXRpb25fb2ZfYV9tb25zdGVyX2N1dGVfa2F3YWlpX2tpZF8zZDQyMWI5NC0yMDk3LTQwNWQtYmM2OS0xOWQxMzM0OWEzNWJfMi5qcGc.jpg",
    "https://img.freepik.com/premium-photo/figurine-cartoon-mammal-animal-ai-generated-image-by-rawpixel_53876-286403.jpg?w=360",
  ];