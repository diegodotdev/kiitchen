"use client";

import { Form, FormField, FormControl, FormItem, FormLabel } from "./ui/form";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { sanity, urlFor } from "@/lib/sanity";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { CATEGORIES } from "@/constants";
import { Label } from "./ui/label";
import { Loader2, Trash, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { createRecipe } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  photo: z.string().min(1),
  ingredients: z.array(
    z.object({
      value: z.string().min(1),
    })
  ),
  instructions: z.array(
    z.object({
      value: z.string().min(1),
    })
  ),
});

export default function RecipeForm() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState<"ing" | "ins">("ing");
  const [imageAssets, setImageAssets] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      photo: "",
      ingredients: [{ value: "" }],
      instructions: [{ value: "" }],
    },
  });

  const upload = (e: any) => {
    const selectedFile = e.target.files[0];

    if (
      selectedFile.type === "image/png" ||
      selectedFile.type === "image/svg" ||
      selectedFile.type === "image/jpeg" ||
      selectedFile.type === "image/gif" ||
      selectedFile.type === "image/tiff"
    ) {
      setLoading(true);
      sanity.assets
        .upload("image", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((document: any) => {
          setLoading(false);
          setImageAssets(document._id);
          form.setValue("photo", document._id);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  const {
    fields: ingredients,
    append: addIng,
    remove: remIng,
  } = useFieldArray({
    name: "ingredients",
    control: form.control,
  });

  const {
    fields: instructions,
    append: addIns,
    remove: remIns,
  } = useFieldArray({
    name: "instructions",
    control: form.control,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const ingList = values.ingredients.map((i) => i.value);
    const insList = values.instructions.map((i) => i.value);

    try {
      await createRecipe({
        ...values,
        ingredients: ingList,
        instructions: insList,
        clerkId: user.id,
      });
      form.reset();
      setImageAssets(null);
      toast.success("Recipe Uploaded");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong, try again");
    }
  };
  if (!user) return <p>Loading...</p>;
  return (
    <Form {...form}>
      <form
        className="w-full flex flex-col gap-8 py-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="w-full flex justify-between items-center">
          <p className="text-3xl font-bold">Create Recipe</p>
          <Button size="sm" type="submit">
            Upload
          </Button>
        </div>
        <div className="w-full flex gap-8">
          <div className="w-1/2 flex flex-col gap-8">
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="w-full h-[300px] border rounded-lg grid relative place-items-center">
              {!imageAssets && !loading ? (
                <Label className="w-full h-full grid place-items-center">
                  <input
                    type="file"
                    onChange={upload}
                    className="w-0 h-0 absolute opacity-0"
                  />
                  <Upload size="15px" />
                </Label>
              ) : loading ? (
                <Loader2 size="15px" className="animate-spin" />
              ) : (
                imageAssets && (
                  <>
                    <img
                      src={urlFor(imageAssets).url()}
                      alt="image uploaded"
                      className="h-[280px] object-cover rounded-lg"
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2"
                      onClick={() => setImageAssets(null)}
                      type="button"
                    >
                      <Trash size="15px" />
                    </Button>
                  </>
                )
              )}
            </div>
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="resize-none h-[200px]" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="category"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CATEGORIES.map((i) => (
                        <SelectItem key={i.id} value={i.label}>
                          {i.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2 flex flex-col gap-8">
            <div className="w-full flex border rounded">
              <Button
                className="rounded-r-none w-1/2"
                onClick={() => setIsActive("ing")}
                variant={isActive === "ing" ? "default" : "ghost"}
                type="button"
              >
                Ingredients
              </Button>
              <Button
                className="rounded-l-none w-1/2"
                onClick={() => setIsActive("ins")}
                variant={isActive === "ins" ? "default" : "ghost"}
                type="button"
              >
                Instructions
              </Button>
            </div>
            {isActive === "ing" && (
              <>
                <div className="w-full flex justify-end">
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => addIng({ value: "" })}
                  >
                    Add Ingredient
                  </Button>
                </div>
                {ingredients.map((field, index) => (
                  <FormField
                    key={field.id}
                    name={`ingredients.${index}.value`}
                    control={form.control}
                    render={({ field }) => (
                      <div className="w-full flex items-center gap-4">
                        <Input {...field} className="grow" />
                        <Button
                          size="sm"
                          type="button"
                          variant="destructive"
                          onClick={() => remIng(index)}
                        >
                          <Trash size="15px" />
                        </Button>
                      </div>
                    )}
                  />
                ))}
              </>
            )}
            {isActive === "ins" && (
              <>
                <div className="w-full flex justify-end">
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => addIns({ value: "" })}
                  >
                    Add Instruction
                  </Button>
                </div>
                {instructions.map((field, index) => (
                  <FormField
                    key={field.id}
                    name={`instructions.${index}.value`}
                    control={form.control}
                    render={({ field }) => (
                      <div className="w-full flex items-center gap-4">
                        <Input {...field} className="grow" />
                        <Button
                          size="sm"
                          type="button"
                          variant="destructive"
                          onClick={() => remIns(index)}
                        >
                          <Trash size="15px" />
                        </Button>
                      </div>
                    )}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}
