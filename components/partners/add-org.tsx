import React, { useEffect, useState } from "react";
import CommonModal from "../CommonModal";
import { useTranslation } from "react-i18next";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useCreateDistrict, useDistrictPartners, useDistrictsByRegion, useFinancePartners } from "@/queries/partners";
import { toast } from "sonner";
import { CreateDistrict, Partner } from "@/types/partners";

interface OrgTypes {
    region?: string
    district?: string
    org?: string
    org_id?: any
}

interface OrgModalProps {
    addOrgModal: boolean;
    setAddOrgModal: (state: boolean) => void;
    setSelectedOrg: (state: OrgTypes | null) => void;
    selectedOrg: any | null
}

const regions = [
    { name: "Toshkent Shahri", value: "TASHKENT_CITY" },
    { name: "Toshkent", value: "TASHKENT" },
    { name: "Andijon", value: "ANDIJAN" },
    { name: "Buxoro", value: "BUKHARA" },
    { name: "Farg‘ona", value: "FERGANA" },
    { name: "Jizzax", value: "JIZZAKH" },
    { name: "Xorazm", value: "KHOREZM" },
    { name: "Namangan", value: "NAMANGAN" },
    { name: "Navoiy", value: "NAVOIY" },
    { name: "Qashqadaryo", value: "KASHKADARYA" },
    { name: "Samarqand", value: "SAMARKAND" },
    { name: "Sirdaryo", value: "SIRDARYA" },
    { name: "Surxondaryo", value: "SURKHANDARYA" },
    { name: "Qoraqalpog‘iston", value: "KARAKALPAKSTAN" },
];

const AddOrgModal: React.FC<OrgModalProps> = ({ setAddOrgModal, addOrgModal, setSelectedOrg, selectedOrg }) => {
    const [region, setRegion] = useState("TASHKENT_CITY");
    const [district, setDistrict] = useState(0);

    const createDistrict = useCreateDistrict()
    const { data: regionsDistrict, refetch: refetchDistricts } = useDistrictsByRegion(region);
    const { data: partners, refetch: refetchPartners } = useDistrictPartners(region, district);

    useEffect(() => {
        refetchDistricts();
        refetchPartners();
        setSelectedOrg(null)
    }, [region, district]);

    const { t } = useTranslation();
    const [org, setOrg] = useState("");
    const [errors, setErrors] = useState({ region: false, district: false, org: false });
    const [addNewModal, setAddNewModal] = useState(false);
    const [newType, setNewType] = useState("");
    const [newDistrict, setNewDistrict] = useState("");
    const [newError, setNewError] = useState(false);

    const handleSubmit = () => {
        const newErrors = {
            region: !region,
            district: !district,
            org: !selectedOrg,
        };
        setErrors(newErrors);

        if (!newErrors.region && !newErrors.district && !newErrors.org) {
            console.log({ region, district, org });
            setAddOrgModal(false)
        }
    };

    const handleDistrictSubmit = () => {
        const newErrors = {
            region: !region,
            value: !newDistrict,
        };

        if (newErrors.region || newErrors.value) {
            setNewError(true);
            setErrors((prev) => ({ ...prev, region: newErrors.region }));
        } else {
            const submittingData = {
                region: region,
                district: newDistrict
            }
            console.log("submittingData", submittingData)
            createDistrict.mutate(submittingData, {
                onSuccess: (res) => {
                    if (res.status === "BAD_REQUEST") {
                        toast.message(`${t("messages.err")} ${res.message}`);
                    } else if (res.status === "NOT_FOUND") {
                        toast.message(`${t("messages.err")} ${res.message}`);
                    } else if (res.status === "OK") {
                        console.log(res.data, "res.data");
                        toast.message(t("messages.created"));
                    }
                },
            })
            setAddNewModal(false);
            setNewDistrict("");
            setNewError(false);
        }
    };

    const handleChange = (label: string, value: string) => {
        // if (label === "Region") setRegion(value);
        // if (label === "District") setDistrict(value);
        // if (label === "Organization") setOrg(value);

        setErrors((prev) => ({ ...prev, [label.toLowerCase()]: false }));
    };

    return (
        <>
            <CommonModal onClose={() => setAddOrgModal(false)} visible={addOrgModal} title={t("modals.orgs")}>
                <div className="flex flex-col gap-4">
                    {/* viloyat */}
                    <div>
                        <label className="mb-2" htmlFor="region">{t("forms.region.label")}</label>
                        <Select
                            value={region}
                            onValueChange={(val) => setRegion(val)}
                        >
                            <SelectTrigger className={`focus:outline focus:outline-1 focus:outline-blue-500 ${errors.region ? "border-red-500" : ""}`}>
                                <SelectValue placeholder={t("forms.region.pls")} />
                            </SelectTrigger>
                            <SelectContent>
                                {regions?.map((item) =>
                                    <SelectItem key={item?.value} value={item?.value}>
                                        {item?.name}
                                    </SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                        {errors.region && <p className="text-red-500 text-sm">{t("forms.region.errMsg")}</p>}
                    </div>

                    {/* tuman */}
                    <div>
                        <label className="mb-2" htmlFor="region">{t("forms.district.label")}</label>
                        <Select
                            value={district ? district.toString() : ""}
                            onValueChange={(val) => setDistrict(Number(val))}
                        >
                            <SelectTrigger className="focus:outline focus:outline-1 focus:outline-blue-500">
                                <SelectValue placeholder={district ? regionsDistrict?.data?.find((item: CreateDistrict) => item?.id === district)?.name ?? t("forms.district.pls") : t("forms.district.pls")} />
                            </SelectTrigger>
                            <SelectContent>
                                {regionsDistrict?.data?.map((item: CreateDistrict) => (
                                    <SelectItem key={item?.id} value={item?.id.toString()}>
                                        {item?.name}
                                    </SelectItem>
                                ))}
                                <Button onClick={() => { setAddNewModal(true); setNewType("district"); }} variant="outline">
                                    {t("modals.add")}
                                </Button>
                            </SelectContent>
                        </Select>
                        {errors.district && <p className="text-red-500 text-sm">{t("forms.district.errMsg")}</p>}
                    </div>

                    {/* tashkilot */}
                    <div>
                        <label className="mb-2" htmlFor="region">{t("forms.org.label")}</label>
                        <Select
                            value={selectedOrg?.id ?? ""}
                            onValueChange={(val) => {
                                const selectedItem = partners?.data?.find((item: Partner) => item.id === val) || null;
                                setSelectedOrg(selectedItem);
                            }}
                        >
                            <SelectTrigger className={`focus:outline focus:outline-1 focus:outline-blue-500 ${errors.org ? "border-red-500" : ""}`}>
                                <SelectValue placeholder={t("forms.org.pls")}>{selectedOrg?.name}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {partners?.data?.length > 0 ?
                                    partners?.data?.map((item: Partner) =>
                                        <SelectItem key={item?.id} value={item?.id}>{item?.name}</SelectItem>
                                    ) : <p className="text-center">{t("common.noData")}</p>}
                            </SelectContent>
                        </Select>
                        {errors.org && <p className="text-red-500 text-sm">{t("forms.org.errMsg")}</p>}
                    </div>

                    <Button className="mt-5"
                        onClick={() => {
                            handleSubmit()
                        }}>
                        {t("buttons.add")}
                    </Button>
                </div>
            </CommonModal>

            <CommonModal visible={addNewModal} onClose={() => setAddNewModal(false)} title={
                newType == "org" ?
                    t("forms.org.label") :
                    newType == "region" ?
                        t("forms.region.label") :
                        newType == "district" ?
                            t("forms.district.label") :
                            t("forms.org.label")}
            >
                <div>
                    {newType == "district" ?
                        <div>
                            {/* viloyat */}
                            <div className="mb-5">
                                <label className="mb-2" htmlFor="region">{t("forms.region.label")}</label>
                                <Select
                                    value={region}
                                    onValueChange={(val) => handleChange("Region", val)}
                                >
                                    <SelectTrigger className={`focus:outline focus:outline-1 focus:outline-blue-500 ${errors.region ? "border-red-500" : ""}`}>
                                        <SelectValue placeholder={t("forms.region.pls")} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {regions?.map((item) =>
                                            <SelectItem key={item?.value} value={item?.value}>
                                                {item?.name}
                                            </SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                                {errors.region && <p className="text-red-500 text-sm">{t("forms.region.errMsg")}</p>}
                            </div>

                            {/* tuman input */}
                            <div>
                                <label className="mb-2" htmlFor="region">{t("forms.district.label")}
                                </label>
                                <Input
                                    type="text"
                                    value={newDistrict}
                                    onChange={(e) => { setNewDistrict(e.target.value); setNewError(false); }}
                                    className={newError ? "border-red-500" : ""}
                                    placeholder={t("forms.district.enter")}
                                />
                                {newError && <p className="text-red-500 text-sm">{t("forms.district.errMsg")}</p>}
                                <Button className="mt-5" onClick={handleDistrictSubmit}>
                                    {t("buttons.add")}
                                </Button>
                            </div>
                        </div> : "None"}
                </div>
            </CommonModal>
        </>
    );
};

export default AddOrgModal;