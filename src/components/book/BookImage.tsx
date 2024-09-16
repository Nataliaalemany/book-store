import NoImageIcon from '../../icons/NoImageIcon';

type BookImageProps = {
  bookCoverThumbnail: string | undefined;
  bookTitle: string;
};

export default function BookImage({
  bookCoverThumbnail,
  bookTitle,
}: BookImageProps) {
  if (!bookCoverThumbnail) {
    return (
      <div className="flex justify-center">
        <NoImageIcon />
      </div>
    );
  }

  return (
    <img
      className="object-cover w-full h-full"
      src={bookCoverThumbnail}
      alt={bookTitle + 'cover'}
    />
  );
}
