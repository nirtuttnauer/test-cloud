"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Define a schema for the delete form
const podcastEpisodeDeleteSchema = z.object({
  id: z.string().nonempty("ID is required"),
});

export default function DeletePod() {
  const form = useForm<z.infer<typeof podcastEpisodeDeleteSchema>>({
    resolver: zodResolver(podcastEpisodeDeleteSchema),
    defaultValues: {
      id: "",
    },
  });

  async function onSubmit(values: z.infer<typeof podcastEpisodeDeleteSchema>) {
    try {
      const response = await axios.delete(`/api/podcast-episodes/${values.id}`);
      console.log("Podcast episode deleted successfully:", response.data);
      // You can add additional logic to handle the success case
    } catch (error) {
      console.error("Error deleting podcast episode:", error);
      // You can add additional logic to handle the error case
    }
  }


  const { control, handleSubmit } = form;

  return (
    <>
      <div className="max-w-md mx-auto">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Podcast Episode ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Podcast Episode ID" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" variant="destructive">Delete</Button>
          </form>
        </Form>
      </div>
    </>
  );
}
