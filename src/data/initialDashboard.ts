
import { DashboardData } from "../types/dashboard";

export const initialDashboard: DashboardData = {
  categories: [
    {
      id: "cnapp-dashboard",
      name: "CNAPP Dashboard",
      widgets: [],
    },
    {
      id: "cspm-executive-dashboard",
      name: "CSPM Executive Dashboard",
      widgets: [
        {
          id: "cloud-accounts",
          name: "Cloud Accounts",
          type: "donut-chart",
          content: "Cloud accounts overview",
          data: {
            connected: 2,
            notConnected: 2
          }
        },
        {
          id: "cloud-account-risk",
          name: "Cloud Account Risk Assessment",
          type: "progress-chart",
          content: "Risk assessment for cloud accounts",
          data: {
            failed: 1098,
            warning: 498,
            notEvaluated: 94,
            passed: 7761
          }
        }
      ]
    },
    {
      id: "cwpp-dashboard",
      name: "CWPP Dashboard",
      widgets: [
        {
          id: "namespace-alerts",
          name: "Top 5 Namespace Specific Alerts",
          type: "info",
          content: "No Graph data available!"
        },
        {
          id: "workload-alerts",
          name: "Workload Alerts",
          type: "info",
          content: "No Graph data available!"
        }
      ]
    },
    {
      id: "registry-scan",
      name: "Registry Scan",
      widgets: [
        {
          id: "image-risk-assessment",
          name: "Image Risk Assessment",
          type: "progress-bar",
          content: "Risk assessment for images",
          data: {
            critical: 4,
            high: 106
          }
        },
        {
          id: "image-security-issues",
          name: "Image Security Issues",
          type: "progress-bar",
          content: "Security issues in images",
          data: {
            critical: 1,
            high: 2
          }
        }
      ]
    }
  ]
};
