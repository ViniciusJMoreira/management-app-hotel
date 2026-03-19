"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { deleteCabin, updateCabin } from "@/app/_features/_cabins/actions";
import toast from "react-hot-toast";
import SubmitButton from "@/app/_components/SubmitButton";
import InputFile from "./InputFile";
import ResetButton from "@/app/_components/ResetButton";
import DeleteButton from "@/app/_components/DeleteButton";
import BackButton from "@/app/_components/BackButton";

function EditCabinForm({ cabin }) {
  const [preview, setPreview] = useState(() => cabin?.image ?? null);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: cabin,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const router = useRouter();

  async function onSubmit(data) {
    const res = await updateCabin(data);
    if (!res.ok) {
      const fieldErrors = res.fieldErrors ?? {};
      for (const [field, messages] of Object.entries(fieldErrors)) {
        if (!messages?.length) continue;

        // RHF accetta un solo message per campo, tipicamente si usa il primo
        setError(field, { type: "server", message: messages[0] });
      }
      if (res.error) toast.error(res?.error?.message);
      return;
    }
    if (res.ok) {
      toast.success("Cabin updated successfully!");
      router.push(res.redirectTo);
    }
  }

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ["image/png", "image/jpeg", "image/webp"];
    const maxSize = 5 * 1024 * 1024;

    if (!allowed.includes(file.type)) {
      setError("image", {
        type: "client",
        message: "Formato non supportato. Usa PNG, JPG o WEBP.",
      });
      // opzionale: reset del campo
      e.target.value = "";
      return;
    }

    if (file.size > maxSize) {
      setError("image", {
        type: "client",
        message: "File troppo grande. Dimensione massima 5MB.",
      });
      e.target.value = "";
      return;
    }

    // ok -> pulisci eventuali errori precedenti
    clearErrors("image");

    // preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // normalizzi per il backend (come già fai)
    setValue("image", [file], {
      shouldValidate: true,
    });
  }

  function handleReset() {
    setPreview(null);
  }

  async function handleDelete() {
    const res = await deleteCabin(cabin);
    if (!res.ok) toast.error(res?.error?.message);
    if (res.ok) {
      toast.success("Cabin updated successfully!");
      router.push(res.redirectTo);
    }
  }

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12 -mt-4">
        <div>
          <BackButton href={"/dashboard/cabins"} />
          <div className="mt-6">
            <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">
              Cabin {cabin.name}
            </h2>
            <p className="mt-1 text-sm/6 text-gray-600 dark:text-gray-400 max-w-3xl">
              Update the cabin details, including its type, amenities, and main
              characteristics. Changes will be saved and applied immediately.
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="name"
              className="block text-sm/6 font-medium text-gray-900 dark:text-white"
            >
              Cabin name
            </label>
            <div className="mt-2">
              <input
                id="name"
                type="text"
                autoComplete="given-name"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                {...register("name", { required: "This field is required" })}
              />
            </div>
            {errors?.name?.message && (
              <p className="mt-3 text-sm/6 text-gray-600 dark:text-orange-200">
                *{errors?.name?.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="maxCapacity"
              className="block text-sm/6 font-medium text-gray-900 dark:text-white"
            >
              Maximum capacity
            </label>
            <div className="mt-2">
              <input
                id="maxCapacity"
                type="number"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500 no-scrollbar"
                {...register("maxCapacity", {
                  valueAsNumber: true,
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "Capacity should be at least 1",
                  },
                })}
              />
            </div>
            {errors?.maxCapacity?.message && (
              <p className="mt-3 text-sm/6 text-gray-600 dark:text-orange-200">
                *{errors?.maxCapacity?.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="regularPrice"
              className="block text-sm/6 font-medium text-gray-900 dark:text-white"
            >
              Regular price
            </label>
            <div className="mt-2">
              <div className="flex items-center rounded-md bg-white px-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 dark:bg-white/5 dark:outline-white/10 dark:focus-within:outline-indigo-500">
                <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6 dark:text-gray-400">
                  $
                </div>
                <input
                  id="regularPrice"
                  type="number"
                  placeholder="0.00"
                  aria-describedby="price-currency"
                  className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 dark:bg-transparent dark:text-white dark:placeholder:text-gray-500"
                  {...register("regularPrice", {
                    valueAsNumber: true,
                    required: "This field is required",
                    min: {
                      value: 1,
                      message: "Price should be at least 1",
                    },
                  })}
                />
                <div
                  id="price-currency"
                  className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6 dark:text-gray-400"
                >
                  USD
                </div>
              </div>
            </div>
            {errors?.regularPrice?.message && (
              <p className="mt-3 text-sm/6 text-gray-600 dark:text-orange-200">
                *{errors?.regularPrice?.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="discount"
              className="block text-sm/6 font-medium text-gray-900 dark:text-white"
            >
              Discount
            </label>
            <div className="mt-2">
              <div className="flex items-center rounded-md bg-white px-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 dark:bg-white/5 dark:outline-white/10 dark:focus-within:outline-indigo-500">
                <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6 dark:text-gray-400">
                  $
                </div>
                <input
                  id="discount"
                  type="number"
                  placeholder="0.00"
                  aria-describedby="price-currency"
                  className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 dark:bg-transparent dark:text-white dark:placeholder:text-gray-500"
                  {...register("discount", {
                    valueAsNumber: true,
                    required: "This field is required",
                    validate: (value) => {
                      if (value < 0) return "Discount cannot be negative";
                      const price = getValues("regularPrice");
                      if (value > price)
                        return "Discount cannot be greater than regular price";
                      return true;
                    },
                  })}
                />
                <div
                  id="price-currency"
                  className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6 dark:text-gray-400"
                >
                  USD
                </div>
              </div>
            </div>
            {errors?.discount?.message && (
              <p className="mt-3 text-sm/6 text-gray-600 dark:text-orange-200">
                *{errors?.discount?.message}
              </p>
            )}
          </div>

          <div className="col-span-full">
            <label
              htmlFor="description"
              className="block text-sm/6 font-medium text-gray-900 dark:text-white"
            >
              description for website
            </label>
            <div className="mt-2">
              <textarea
                id="description"
                rows={4}
                placeholder="Describe the room type, amenities, and main features"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500 no-scrollbar"
                {...register("description", {
                  required: "This field is required",
                })}
              />
            </div>
            {errors?.description?.message ? (
              <p className="mt-3 text-sm/6 text-gray-600 dark:text-orange-200">
                *{errors?.description?.message}
              </p>
            ) : (
              <p className="mt-3 text-sm/6 text-gray-600 dark:text-gray-400">
                Write a few sentences about the cabin.
              </p>
            )}
          </div>

          <div className="col-span-full">
            <label
              htmlFor="image"
              className="block text-sm/6 font-medium text-gray-900 dark:text-white ml-2 -mb-3"
            >
              Cabin photo
            </label>
            {preview ? (
              <div className=" w-full h-90 rounded-lg border border-dashed border-gray-900/25 dark:border-white/25 p-2">
                <div className="relative w-full h-full">
                  <Image
                    fill
                    src={preview}
                    alt={preview}
                    className="object-cover object-left"
                  />
                  <div className="absolute inset-0 bg-gray-900/50 opacity-0  transition-opacity hover:opacity-100 grid place-items-center">
                    <InputFile>
                      <input
                        id="image"
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        className="sr-only"
                        {...register("image", {
                          onChange: handleFile,
                        })}
                      />
                    </InputFile>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 dark:border-white/25">
                <InputFile empty={true}>
                  <input
                    id="image"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="sr-only"
                    {...register("image", {
                      onChange: handleFile,
                    })}
                  />
                </InputFile>
              </div>
            )}
            {errors?.image?.message && (
              <p className="mt-3 text-sm/6 text-gray-600 dark:text-orange-200">
                *{errors?.image?.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-3">
        <Delete onDelete={handleDelete} />
        <ResetButton onReset={handleReset} />
        <Submit />
      </div>
    </form>
  );
}

function Delete({ onDelete }) {
  const { pending } = useFormStatus();
  return <DeleteButton isLoading={pending} onDelete={onDelete} />;
}

function Submit() {
  const { pending } = useFormStatus();
  return <SubmitButton isLoading={pending} />;
}

export default EditCabinForm;
