"use client";

import { useFormState } from "react-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { SubmitButton } from "./SubmitButtons";
import { SettingsAction } from "../action";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { settingsSchema } from "../lib/zodSchemas";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { X } from "lucide-react";
import { UploadDropzone } from "../lib/uploadthing";
import { toast } from "sonner";

interface iAppProps{
    fullname: string;
    email: string;
    profileImage: string;
}


export function SettingsForm({fullname, email, profileImage}:iAppProps){
    const [lastResult, action] =useFormState(SettingsAction,undefined);
    const [currentprofileImage, setcurrentProfileImage] = useState(profileImage);
    const [form, fields]= useForm({
        lastResult,

        onValidate({formData}){
            return parseWithZod(formData,{
                schema: settingsSchema,
            });
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    })

    const handleDeleteImage: () => void = () => {
        setcurrentProfileImage("");
    }
    
    return(
    <Card>
        <CardHeader>
            <CardTitle>
                Settings
            </CardTitle>
            <CardDescription>Manage your account settings!</CardDescription>
        </CardHeader>

        <form id={form.id} onSubmit={form.onSubmit} action={action}>
            <CardContent className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-2">
                    <Label>Full Name</Label>
                    <Input 
                    key={fields.fullName.key} 
                    name={fields.fullName.name } 
                    defaultValue={fullname} 
                    placeholder="Your Full name"/>
                    <p className="text-red-500 text-sm">{fields.fullName.errors}</p>
                </div>
                <div className="flex flex-col gap-y-2">
                    <Label>Email</Label>
                    <Input 
                    defaultValue={email} 
                    placeholder="@gmail.com" 
                    disabled/>
                </div>
                <div className="grid gap-y-5">
                    <Label>Profile Image</Label>
                    <input 
                    type="hidden" 
                    name={fields.profileImage.name} 
                    value={currentprofileImage}
                    key={fields.profileImage.key}
                    />
                    {currentprofileImage ?(
                        <div className="relative size-16">
                            <img src={currentprofileImage}
                         alt="Profile Image"
                          className="size-16 rounded-lg"/>

                          <Button 
                           variant="destructive"
                           onClick={handleDeleteImage}
                           type="button"
                           size="icon" 
                           className="absolute -top-3 -right-3">
                            <X className="size-4 "/>
                          </Button>
                        </div>
                        
                    ):(
                        <UploadDropzone 
                        onClientUploadComplete={(res) => {
                            setcurrentProfileImage(res[0].url);
                            toast.success("Image Uploaded Successfully");
                        }} 
                        onUploadError={(error) => {
                            console.log("Upload Error", error);
                            toast.error("Image Upload Failed");
                        }}
                        endpoint="imageUploader"/>
                    )}
                    <p className="text-red-500 text-sm">{fields.profileImage.errors}</p>
                </div>
            </CardContent>
            <CardFooter>
                <SubmitButton text="Save Changes"></SubmitButton>
            </CardFooter>
        </form>
    </Card>
    )
}