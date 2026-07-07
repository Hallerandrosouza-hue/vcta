// ============================================
// Automation Types - Vecta CRM
// ============================================

export type AutomationTrigger = "message_received" | "lead_created" | "tag_added" | "score_changed" | "status_changed" | "schedule";
export type AutomationAction = "send_ai" | "classify_lead" | "add_tag" | "create_task" | "notify_agent" | "send_message" | "update_lead";
export type AutomationStatus = "active" | "inactive" | "draft";

export interface AutomationNode {
  id: string;
  type: "trigger" | "condition" | "action";
  trigger_type?: AutomationTrigger;
  action_type?: AutomationAction;
  config: Record<string, unknown>;
  position: { x: number; y: number };
  next_nodes: string[];
}

export interface Automation {
  id: string;
  name: string;
  description?: string;
  status: AutomationStatus;
  trigger: AutomationTrigger;
  nodes: AutomationNode[];
  executions_count: number;
  last_executed?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateAutomationRequest {
  name: string;
  description?: string;
  trigger: AutomationTrigger;
  nodes: Omit<AutomationNode, "id">[];
}

export interface UpdateAutomationRequest extends Partial<CreateAutomationRequest> {
  status?: AutomationStatus;
}
