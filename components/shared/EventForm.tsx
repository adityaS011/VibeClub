"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import DatePicker from "react-datepicker";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { eventFormSchema } from "@/lib/validator";
import { eventDefaultValues } from "@/constants";
import Dropdown from "./Dropdown";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { FileUploader } from "./FileUploader";
import Image from "next/image";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "../ui/checkbox";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { createEvent } from "@/lib/actions/events.actions";
interface EventFormProps {
  userId: string;
  type: "Create" | "Edit";
}

const EventForm = ({ userId, type }: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const initialValues = eventDefaultValues;
  const { startUpload } = useUploadThing("imageUploader");
  const router = useRouter();
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    let uploadedImageUrl = values.imageUrl;
    if (files.length > 0) {
      const uploadedImages = await startUpload(files);
      if (!uploadedImages) return;

      uploadedImageUrl = uploadedImages[0].url;
    }
    if (type === "Create") {
      try {
        const newEvent = await createEvent({
          event: { ...values, imageUrl: uploadedImageUrl },
          userId,
          path: "/profile",
        });
        if (newEvent) {
          form.reset();
          router.push(`/events/${newEvent._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormControl>
                  <Input
                    placeholder="Event Title"
                    className="input-field dark:bg-slate-500/10 dark:text-white" 
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                    userId={userId}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea
                    placeholder="Event Description"
                    className="textarea rounded-2xl dark:bg-slate-500/10 dark:text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormControl>
                  <div className="px-4 bg-grey-50 dark:bg-slate-500/10 dark:text-white h-[55px] w-full py-2 rounded-full overflow-hidden flex-center">
                    <Image
                      src="/assets/icons/location-grey.svg"
                      width={24}
                      height={24}
                      alt="location.svg"
                    />
                    <Input
                      placeholder="Event Location"
                      className="input-field dark:bg-transparent focus-visible:ring-transparent focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 "
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="startDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="px-4 bg-grey-50 dark:bg-slate-500/10 dark:text-white h-[55px] w-full py-2 rounded-full overflow-hidden flex-center">
                    <Image
                      src="/assets/icons/calendar.svg"
                      width={24}
                      height={24}
                      alt="calendar.svg"
                      className="filter-grey"
                    />
                    <p className="ml-3 whitespace-nowrap text-grey-600 dark:text-grey-400">
                      Start Date
                    </p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="px-4 bg-grey-50 dark:bg-slate-500/10 dark:text-white h-[55px] w-full py-2 rounded-full overflow-hidden flex-center">
                    <Image
                      src="/assets/icons/calendar.svg"
                      width={24}
                      height={24}
                      alt="calendar.svg"
                      className="filter-grey"
                    />
                    <p className="ml-3 whitespace-nowrap text-grey-600 dark:text-grey-400">
                      End Date
                    </p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 dark:bg-slate-500/10 px-4 py-2">
                    <Image
                      src="/assets/icons/dollar.svg"
                      alt="dollar"
                      width={24}
                      height={24}
                      className="filter-grey"
                    />
                    <Input
                      type="number"
                      placeholder="Event Price"
                      {...field}
                      className="p-regular-16 border-0 bg-grey-50 dark:bg-transparent dark:text-white outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <FormField
                      control={form.control}
                      name="isFree"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center">
                              <label
                                htmlFor="isFree"
                                className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white"
                              >
                                Free Ticket
                              </label>
                              <Checkbox
                                onCheckedChange={field.onChange}
                                checked={field.value}
                                id="isFree"
                                className="mr-2 h-5 w-5 border-2 border-primary-500"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="px-4 bg-grey-50 dark:bg-slate-500/10 dark:text-white h-[55px] w-full py-2 rounded-full overflow-hidden flex-center">
                    <Image
                      src="/assets/icons/link.svg"
                      width={24}
                      height={24}
                      alt="url.svg"
                    />
                    <Input
                      placeholder="URL"
                      className="input-field dark:bg-transparent focus-visible:ring-transparent focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 "
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full font-semibold dark:text-white"
        >
          {form.formState.isSubmitting ? "Submitting..." : `${type} Event`}
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;
