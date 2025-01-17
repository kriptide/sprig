import metrics from "../metrics";

export async function onRequest({ request }: any, next: () => any) {
	const path = new URL(request.url).pathname.slice(1);

	if (!path.includes("api")) return next();

	const metricName = path.split("/").join("_");
	const response = await next();

	const metricKey = `${response.status}.${metricName}`;
	console.log(metricKey);
	metrics.increment(metricKey, 1);
}