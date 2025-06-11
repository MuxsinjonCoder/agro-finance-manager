import CommonModal from "@/components/CommonModal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function SignReqAssignModal({
  signReqAssign,
  setSignReqAssign,
}: any) {
  const [selected, setSelected] = useState<string | undefined>();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) {
      setError("Iltimos, e-imzoni tanlang");
      return;
    }
    setError(null);
    console.log("Form submitted with selected value:", selected);
    // Imzolash logikasi bu yerga qo'shiladi
  };

  return (
    <>
      <CommonModal
        width="400px"
        visible={signReqAssign}
        onClose={() => {
          setSignReqAssign(false);
          setSelected(undefined);
          setError(null);
        }}
        title="E-imzoni tanlash"
      >
        <form onSubmit={handleSubmit}>
          <div>
            <Label>E-imzoni tanlang</Label>
            <Select
              onValueChange={(value: string) => {
                setSelected(value);
                setError(null);
              }}
              value={selected}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">item-1</SelectItem>
                <SelectItem value="2">item-2</SelectItem>
                <SelectItem value="3">item-3</SelectItem>
              </SelectContent>
            </Select>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <Button type="submit" className="mt-7">
            Imzolash
          </Button>
        </form>
      </CommonModal>
    </>
  );
}
