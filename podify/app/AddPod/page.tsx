"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const podcastEpisodeSchema = z.object({
  id: z.string(),
  name: z.string(),
  uri: z.string(),
  release_date: z.string(),
});

export default function AddPod() {
  const form = useForm<z.infer<typeof podcastEpisodeSchema>>({
    resolver: zodResolver(podcastEpisodeSchema),
    defaultValues: {
      id: "123",
      name: "The Joe Rogan Experience",
      uri: "https://example.com/joe-rogan",
      release_date: "2021-09-01",
    },
  });

  async function onSubmit(values: z.infer<typeof podcastEpisodeSchema>) {
    try {
      const response = await axios.post('/api/podcast-episodes', values);
      console.log("Podcast episode created successfully:", response.data);
      // You can add additional logic to handle the success case
    } catch (error) {
      console.error("Error creating podcast episode:", error);
      // You can add additional logic to handle the error case
    }
    // console.log("Form values:", values);
  }

  return (
    <div className="max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID</FormLabel>
                <FormControl>
                  <Input placeholder="Episode ID" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Episode Name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="uri"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URI</FormLabel>
                <FormControl>
                  <Input placeholder="Episode URI" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="release_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Release Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          {/* You can add the images field as needed */}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
