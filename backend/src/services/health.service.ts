export interface HealthCheckResult {
  message: string;
}

export const getHealthStatus = (): HealthCheckResult => {
  return {
    message: 'SketchFlow Backend Running',
  };
};
