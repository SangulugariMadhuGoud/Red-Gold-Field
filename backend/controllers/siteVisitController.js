// Site visit controller - handles site visit form requests
import siteVisitService from "../services/siteVisitService.js";
import validateSiteVisit from "../validators/siteVisit.js";

const submitSiteVisit = async (req, res) => {
  try {
    const { isValid, errors } = validateSiteVisit(req.body);
    if (!isValid) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    const siteVisit = await siteVisitService.saveSiteVisit(req.body);
    await siteVisitService.sendAdminSiteVisitEmail(req.body);
    if (req.body.email) {
      await siteVisitService.sendVisitConfirmationEmail(req.body);
    }

    res
      .status(201)
      .json({
        message: "Site visit request submitted successfully",
        siteVisit,
      });
  } catch (error) {
    console.error("Error submitting site visit:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllSiteVisits = async (req, res) => {
  try {
    const siteVisits = await siteVisitService.getAllSiteVisits();
    res.json(siteVisits);
  } catch (error) {
    console.error("Error fetching site visits:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getSiteVisitById = async (req, res) => {
  try {
    const siteVisit = await siteVisitService.getSiteVisitById(req.params.id);
    if (!siteVisit) {
      return res.status(404).json({ message: "Site visit not found" });
    }
    res.json(siteVisit);
  } catch (error) {
    console.error("Error fetching site visit:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const siteVisit = await siteVisitService.updateSiteVisitStatus(
      req.params.id,
      status,
    );
    if (!siteVisit) {
      return res.status(404).json({ message: "Site visit not found" });
    }
    res.json(siteVisit);
  } catch (error) {
    console.error("Error updating site visit status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteSiteVisit = async (req, res) => {
  try {
    const siteVisit = await siteVisitService.deleteSiteVisit(req.params.id);
    if (!siteVisit) {
      return res.status(404).json({ message: "Site visit not found" });
    }
    res.json({ message: "Site visit deleted successfully" });
  } catch (error) {
    console.error("Error deleting site visit:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  submitSiteVisit,
  getAllSiteVisits,
  getSiteVisitById,
  updateStatus,
  deleteSiteVisit,
};
