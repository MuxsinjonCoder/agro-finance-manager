"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllPerms, useRoles } from "@/queries/roles";
import { useUpdateUserData } from "@/queries/users";
import { toast } from "sonner";

export default function EditUserForm({ editingUser, setEditRoleModal }: any) {
  const [formData, setFormData] = useState({
    fullName: "",
    role: "",
  });

  const { data: roles } = useRoles();
  const updateUserData = useUpdateUserData();

  useEffect(() => {
    if (editingUser) {
      setFormData({
        fullName: editingUser.fullName || "",
        role: editingUser.role?.length > 0 ? editingUser.role[0].name : "",
      });
    }
  }, [editingUser]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      role: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const selectedRole = roles?.data?.find(
      (r: any) => r.name === formData.role
    );
    const updatedUserData = {
      fullName: formData.fullName,
      roleId: selectedRole?.id || null,
    };

    updateUserData.mutate(
      { id: editingUser.id, data: { ...updatedUserData } },
      {
        onSuccess: () => {
          toast.success("Foydalanuvchi muvaffaqiyatli o'zgartirildi!");
          setEditRoleModal(false);
        },
      }
    );
  };

  return (
    <div className="p-0 w-full mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="fullName"
            className="text-sm font-medium text-gray-700 block mb-2"
          >
            Full Name
          </label>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
            className="w-full rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="role"
            className="text-sm font-medium text-gray-700 block mb-2"
          >
            Role
          </label>
          <Select
            onValueChange={handleRoleChange}
            defaultValue={
              editingUser?.role?.length > 0 ? editingUser.role[0].name : ""
            }
          >
            <SelectTrigger className="w-full rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              {roles?.data?.map((perm: any) => (
                <SelectItem
                  key={perm.id}
                  value={perm.name}
                  className="hover:bg-gray-100"
                >
                  {perm.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          Update User
        </Button>
      </form>
    </div>
  );
}
