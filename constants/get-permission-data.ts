import { getI18n } from "react-i18next";

const getPermissionData = () => {
  const { t } = getI18n();
  const data = [
    {
      name: "applications",
      permissions: [
        { label: t("roles.permissions.getAll"), value: "getAll", active: true },
        { label: t("roles.permissions.create"), value: "create" },
        { label: t("roles.permissions.delete"), value: "delete" },
      ],
    },
    {
      name: "budget",
      permissions: [
        { label: t("roles.permissions.getAll"), value: "getAll", active: true },
        { label: t("roles.permissions.create"), value: "create", active: true },
        { label: t("roles.permissions.update"), value: "update" },
        { label: t("roles.permissions.delete"), value: "delete" },
      ],
    },
    {
      name: "categories",
      permissions: [
        { label: t("roles.permissions.getAll"), value: "getAll", active: true },
        { label: t("roles.permissions.create"), value: "create" },
        { label: t("roles.permissions.update"), value: "update" },
        { label: t("roles.permissions.delete"), value: "delete" },
      ],
    },
    {
      name: "contracts",
      permissions: [
        { label: t("roles.permissions.getAll"), value: "getAll", active: true },
        { label: t("roles.permissions.create"), value: "create", active: true },
        { label: t("roles.permissions.update"), value: "update" },
        { label: t("roles.permissions.delete"), value: "delete" },
        { label: t("roles.permissions.files"), value: "files" },
      ],
    },
    {
      name: "court-decisions",
      permissions: [
        { label: t("roles.permissions.getAll"), value: "getAll", active: true },
        { label: t("roles.permissions.create"), value: "create" },
        { label: t("roles.permissions.files"), value: "files" },
      ],
    },
    {
      name: "document",
      permissions: [
        { label: t("roles.permissions.getAll"), value: "getAll", active: true },
        { label: t("roles.permissions.create"), value: "create" },
        { label: t("roles.permissions.files"), value: "files" },
      ],
    },
    {
      name: "partners",
      permissions: [
        { label: t("roles.permissions.getAll"), value: "getAll", active: true },
        { label: t("roles.permissions.create"), value: "create", active: true },
        { label: t("roles.permissions.update"), value: "update" },
        { label: t("roles.permissions.delete"), value: "delete" },
      ],
    },
    {
      name: "payments",
      permissions: [
        { label: t("roles.permissions.getAll"), value: "getAll", active: true },
        { label: t("roles.permissions.create"), value: "create" },
      ],
    },
    {
      name: "roles",
      permissions: [
        { label: t("roles.permissions.getAll"), value: "getAll", active: true },
        { label: t("roles.permissions.create"), value: "create" },
        { label: t("roles.permissions.delete"), value: "delete" },
      ],
    },
  ];

  return data;
};

export default getPermissionData;
