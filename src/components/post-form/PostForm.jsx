import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file && file.$id) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData?.$id });
                if (dbPost && dbPost.$id) {
                    navigate(`/post/${dbPost.$id}`);
                } else {
                    // handle error, e.g., show a message
                }
            } else {
                // handle error, e.g., show a message
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="w-full flex flex-col gap-8 md:grid md:grid-cols-3 md:gap-8 text-left">
            {/* Left/Main Column */}
            <div className="md:col-span-2 flex flex-col gap-6">
                <div className="bg-white/60 backdrop-blur-lg rounded-xl p-5 shadow-md border border-cyan-100">
                    <Input
                        label="Title :"
                        placeholder="Title"
                        className="mb-4 bg-white/80 border-cyan-200 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-cyan-400"
                        {...register("title", { required: true })}
                    />
                    <Input
                        label="Slug :"
                        placeholder="Slug"
                        className="mb-4 bg-white/80 border-cyan-200 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-cyan-400"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                    <div className="mb-4">
                        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")}/>
                    </div>
                </div>
            </div>
            {/* Right/Sidebar Column */}
            <div className="flex flex-col gap-6 w-full md:w-auto">
                <div className="w-full min-w-[260px] md:min-w-[320px] bg-white/60 backdrop-blur-lg rounded-xl p-5 shadow-md border border-cyan-100 flex flex-col gap-4">
                    <Input
                        label="Featured Image :"
                        type="file"
                        className="mb-2 bg-white/80 border-cyan-200 text-gray-900 focus:bg-white focus:border-cyan-400 w-full"
                        style={{maxWidth: '100%'}}
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                    {post && (
                        <div className="w-full mb-2">
                             {console.log("Preview URL:", appwriteService.getFilePreview(post.featuredImage))}
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-lg"
                            />
                        </div>
                    )}
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="mb-2 bg-white/80 border-cyan-200 text-gray-900 focus:bg-white focus:border-cyan-400"
                        {...register("status", { required: true })}
                    />
                    <Button type="submit" className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-3 rounded-xl font-semibold text-lg shadow-md transition-all duration-300 hover:from-cyan-500 hover:to-blue-600 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400">
                        {post ? "Update" : "Submit"}
    
                    </Button>
                </div>
            </div>
        </form>
    );
}