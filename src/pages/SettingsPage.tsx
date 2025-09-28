import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

const SettingsPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    companyName: user?.companyName || "",
    taxId: user?.taxId || "",
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

  const handleSave = async () => {
    setLoading(true);
    try {
      // Update user data in localStorage
      const updatedUser = { ...user, ...formData };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Update the auth context (you might need to add an updateUser method to AuthContext)
      toast.success(t("settings.updateSuccess"));
      setIsEditing(false);

      // Reload the page to reflect changes
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
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground mb-2">
                {t("auth.name")}
              </div>
              {isEditing ? (
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder={t("auth.enterName")}
                />
              ) : (
                <div className="font-medium">{user.name}</div>
              )}
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-2">
                {t("auth.email")}
              </div>
              {isEditing ? (
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder={t("auth.enterEmail")}
                />
              ) : (
                <div className="font-medium">{user.email}</div>
              )}
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-2">
                {t("auth.accountType")}
              </div>
              <div className="font-medium capitalize">{user.accountType}</div>
            </div>
            {user.accountType === "organization" && (
              <>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">
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
                    <div className="font-medium">{user.companyName || "-"}</div>
                  )}
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">
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

          <div className="flex gap-2 pt-4">
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
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
