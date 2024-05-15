import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "lucide-react";

// Adding a TypeScript interface for episode type, adjust according to actual data structure
interface Episode {
  id: string;
  name: string;
  release_date: string;
  uri: string;
}

interface PodListProps {
  episodes: Episode[]; // Expecting episodes array as a prop
}

export function PodList({ episodes }: PodListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="text-right">
          <TableHead className="text-right">ID</TableHead>
          <TableHead className="text-right">שם</TableHead>
          <TableHead className="text-right">תאריך</TableHead>
          <TableHead className="text-right">לינק</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {episodes.map((episode) => (
          <TableRow key={episode.id}>
            <TableCell className="font-medium">{episode.id}</TableCell>
            <TableCell>{episode.name}</TableCell>
            <TableCell>{episode.release_date}</TableCell>
            <TableCell><a href={episode.uri}>*</a></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
