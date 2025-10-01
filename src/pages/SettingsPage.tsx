import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Camera } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const SettingsPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    companyName: user?.companyName || "",
    taxId: user?.taxId || "",
    profileImage: user?.profileImage || "",
  });
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">{t("common.loading")}</div>
      </div>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      handleInputChange("profileImage", reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const updatedUser = { ...user, ...formData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success(t("settings.updateSuccess"));
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      toast.error(t("settings.updateError"));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      companyName: user?.companyName || "",
      taxId: user?.taxId || "",
      profileImage: user?.profileImage || "",
    });
    setIsEditing(false);
  };

  const profileImg =
    formData.profileImage ||
    "https://ui-avatars.com/api/?name=" +
      encodeURIComponent(user?.name || "User") +
      "&background=random&color=fff";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{t("settings.title")}</CardTitle>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)}>
                {t("settings.editProfile")}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* العمود الأول - الصورة + الاسم */}
            <div className="flex flex-col items-center text-center gap-3">
              <div className="relative">
                <img
                  src={profileImg}
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover border cursor-pointer"
                  onClick={() =>
                    isEditing
                      ? document.getElementById("profileImage")?.click()
                      : setOpenPreview(true)
                  }
                />
                {isEditing && (
                  <div className="absolute bottom-0 right-0 bg-black/70 rounded-full p-1 pointer-events-none">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>

              {/* input مخفي */}
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />

              <div className="mt-2">
                <h2 className="text-lg font-semibold">
                  {formData.name || user.name}
                </h2>
              </div>
            </div>

            {/* العمود الثاني - باقي البيانات */}
            <div className="md:col-span-2 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    {t("auth.name")}
                  </div>
                  {isEditing ? (
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder={t("auth.enterName")}
                    />
                  ) : (
                    <div className="font-medium">{user.name}</div>
                  )}
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    {t("auth.email")}
                  </div>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder={t("auth.enterEmail")}
                    />
                  ) : (
                    <div className="font-medium break-all max-w-full">
                      {user.email}
                    </div>
                  )}
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    {t("auth.accountType")}
                  </div>
                  <div className="font-medium capitalize">
                    {user.accountType}
                  </div>
                </div>

                {user.accountType === "organization" && (
                  <>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        {t("auth.companyName")}
                      </div>
                      {isEditing ? (
                        <Input
                          value={formData.companyName}
                          onChange={(e) =>
                            handleInputChange("companyName", e.target.value)
                          }
                          placeholder={t("auth.enterCompanyName")}
                        />
                      ) : (
                        <div className="font-medium">
                          {user.companyName || "-"}
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        {t("auth.taxId")}
                      </div>
                      {isEditing ? (
                        <Input
                          value={formData.taxId}
                          onChange={(e) =>
                            handleInputChange("taxId", e.target.value)
                          }
                          placeholder={t("auth.enterTaxId")}
                        />
                      ) : (
                        <div className="font-medium">{user.taxId || "-"}</div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* الأزرار */}
              <div className="flex gap-2 pt-2">
                {isEditing ? (
                  <>
                    <Button onClick={handleSave} disabled={loading}>
                      {loading ? t("common.loading") : t("settings.save")}
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      {t("common.cancel")}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="secondary" onClick={() => navigate("/")}>
                      {t("common.back")}
                    </Button>
                    <Button variant="destructive" onClick={logout}>
                      {t("auth.logout")}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialog لمعاينة الصورة */}
      <Dialog open={openPreview} onOpenChange={setOpenPreview}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t("settings.profileImage")}</DialogTitle>
          </DialogHeader>
          <img
            src={profileImg}
            alt="Preview"
            className="w-full h-auto rounded-lg"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SettingsPage;
