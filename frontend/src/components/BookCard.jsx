export default function BookCard({ book, onClick }) {
  return (
    <div className="book-card-wrapper" onClick={() => onClick && onClick(book)}>
      <div className="book-card">
        {book.imageUrl ? (
          <img
            className="book-card-cover"
            src={book.imageUrl}
            alt={book.title}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : null}
        <div
          className="book-card-cover-placeholder"
          style={{ display: book.imageUrl ? "none" : "flex" }}
        >
          📖
        </div>
        <div className="book-card-info">
          <div className="book-card-title" title={book.title}>{book.title}</div>
          <div className="book-card-author">{book.authorName}</div>
        </div>
      </div>
      {book.available !== undefined && (
        <span className={book.available ? "book-card-available" : "book-card-unavailable"}>
          {book.available ? "✓ Available" : "✗ Taken"}
        </span>
      )}
    </div>
  );
}
