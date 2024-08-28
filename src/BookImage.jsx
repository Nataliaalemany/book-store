import NoImageIcon from "./icons/NoImageIcon";

export default function BookImage({ bookCoverThumbnail, bookTitle }) {

  if (!bookCoverThumbnail) {
    return <div className="flex justify-center">
      <NoImageIcon />
    </div>
  }

  return (
    <img className="object-cover w-full h-full" src={bookCoverThumbnail} alt={bookTitle + "cover"} />
  )
}
