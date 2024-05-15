// src/contexts/BookContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BookContextType {
  selectedBook: string;
  setSelectedBook: (book: string) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [selectedBook, setSelectedBook] = useState("");

  return (
    <BookContext.Provider value={{ selectedBook, setSelectedBook }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBook = () => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error('useBook must be used within a BookProvider');
  }
  return context;
};
