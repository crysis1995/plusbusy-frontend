/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface LoginPayload {
	username: string;
	password: string;
}

export type BasicUserDto = object;

export type CreateCompanyDto = object;

export type UpdateCompanyDto = object;

export interface Driver {
	Id: number;
	Name: string;
	Surname: string;
	Phone: string | null;
	Email: string | null;
	IsPhoneConfirmed: boolean;
	IsEmailConfirmed: boolean;
}

export type CreateDriverDto = object;

export type UpdateDriverDto = object;

export type CreateDriverPeriodicInspectionDto = object;

export type UpdateDriverPeriodicInspectionDto = object;

export type CreateVehicleMileageDto = object;

export type CreateVehicleDto = object;

export type UpdateVehicleDto = object;

export type CreateVehiclePeriodicInspectionDto = object;

export type UpdateVehiclePeriodicInspectionDto = object;

export type CreateDriverPreferredVehiclesDto = object;

export type UpdateDriverPreferredVehiclesDto = object;

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
	/** set parameter to `true` for call `securityWorker` for this request */
	secure?: boolean;
	/** request path */
	path: string;
	/** content type of request body */
	type?: ContentType;
	/** query params */
	query?: QueryParamsType;
	/** format of response (i.e. response.json() -> format: "json") */
	format?: ResponseFormat;
	/** request body */
	body?: unknown;
	/** base url */
	baseUrl?: string;
	/** request cancellation token */
	cancelToken?: CancelToken;
}

export type RequestParams = Omit<
	FullRequestParams,
	"body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
	baseUrl?: string;
	baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
	securityWorker?: (
		securityData: SecurityDataType | null
	) => Promise<RequestParams | void> | RequestParams | void;
	customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
	extends Response {
	data: D;
	error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
	Json = "application/json",
	FormData = "multipart/form-data",
	UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
	public baseUrl: string = "";
	private securityData: SecurityDataType | null = null;
	private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
	private abortControllers = new Map<CancelToken, AbortController>();
	private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
		fetch(...fetchParams);

	private baseApiParams: RequestParams = {
		credentials: "same-origin",
		headers: {},
		redirect: "follow",
		referrerPolicy: "no-referrer",
	};

	constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
		Object.assign(this, apiConfig);
	}

	public setSecurityData = (data: SecurityDataType | null) => {
		this.securityData = data;
	};

	protected encodeQueryParam(key: string, value: any) {
		const encodedKey = encodeURIComponent(key);
		return `${encodedKey}=${encodeURIComponent(
			typeof value === "number" ? value : `${value}`
		)}`;
	}

	protected addQueryParam(query: QueryParamsType, key: string) {
		return this.encodeQueryParam(key, query[key]);
	}

	protected addArrayQueryParam(query: QueryParamsType, key: string) {
		const value = query[key];
		return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
	}

	protected toQueryString(rawQuery?: QueryParamsType): string {
		const query = rawQuery || {};
		const keys = Object.keys(query).filter(
			(key) => "undefined" !== typeof query[key]
		);
		return keys
			.map((key) =>
				Array.isArray(query[key])
					? this.addArrayQueryParam(query, key)
					: this.addQueryParam(query, key)
			)
			.join("&");
	}

	protected addQueryParams(rawQuery?: QueryParamsType): string {
		const queryString = this.toQueryString(rawQuery);
		return queryString ? `?${queryString}` : "";
	}

	private contentFormatters: Record<ContentType, (input: any) => any> = {
		[ContentType.Json]: (input: any) =>
			input !== null && (typeof input === "object" || typeof input === "string")
				? JSON.stringify(input)
				: input,
		[ContentType.FormData]: (input: any) =>
			Object.keys(input || {}).reduce((formData, key) => {
				const property = input[key];
				formData.append(
					key,
					property instanceof Blob
						? property
						: typeof property === "object" && property !== null
						? JSON.stringify(property)
						: `${property}`
				);
				return formData;
			}, new FormData()),
		[ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
	};

	protected mergeRequestParams(
		params1: RequestParams,
		params2?: RequestParams
	): RequestParams {
		return {
			...this.baseApiParams,
			...params1,
			...(params2 || {}),
			headers: {
				...(this.baseApiParams.headers || {}),
				...(params1.headers || {}),
				...((params2 && params2.headers) || {}),
			},
		};
	}

	protected createAbortSignal = (
		cancelToken: CancelToken
	): AbortSignal | undefined => {
		if (this.abortControllers.has(cancelToken)) {
			const abortController = this.abortControllers.get(cancelToken);
			if (abortController) {
				return abortController.signal;
			}
			return void 0;
		}

		const abortController = new AbortController();
		this.abortControllers.set(cancelToken, abortController);
		return abortController.signal;
	};

	public abortRequest = (cancelToken: CancelToken) => {
		const abortController = this.abortControllers.get(cancelToken);

		if (abortController) {
			abortController.abort();
			this.abortControllers.delete(cancelToken);
		}
	};

	public request = async <T = any, E = any>({
		body,
		secure,
		path,
		type,
		query,
		format,
		baseUrl,
		cancelToken,
		...params
	}: FullRequestParams): Promise<HttpResponse<T, E>> => {
		const secureParams =
			((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
				this.securityWorker &&
				(await this.securityWorker(this.securityData))) ||
			{};
		const requestParams = this.mergeRequestParams(params, secureParams);
		const queryString = query && this.toQueryString(query);
		const payloadFormatter = this.contentFormatters[type || ContentType.Json];
		const responseFormat = format || requestParams.format;

		return this.customFetch(
			`${baseUrl || this.baseUrl || ""}${path}${
				queryString ? `?${queryString}` : ""
			}`,
			{
				...requestParams,
				headers: {
					...(requestParams.headers || {}),
					...(type && type !== ContentType.FormData
						? { "Content-Type": type }
						: {}),
				},
				signal: cancelToken
					? this.createAbortSignal(cancelToken)
					: requestParams.signal,
				body:
					typeof body === "undefined" || body === null
						? null
						: payloadFormatter(body),
			}
		).then(async (response) => {
			const r = response as HttpResponse<T, E>;
			r.data = null as unknown as T;
			r.error = null as unknown as E;

			const data = !responseFormat
				? r
				: await response[responseFormat]()
						.then((data) => {
							if (r.ok) {
								r.data = data;
							} else {
								r.error = data;
							}
							return r;
						})
						.catch((e) => {
							r.error = e;
							return r;
						});

			if (cancelToken) {
				this.abortControllers.delete(cancelToken);
			}

			if (!response.ok) throw data;
			return data;
		});
	};
}

/**
 * @title Bus Transport
 * @version 0.8
 * @contact
 *
 * The API of bus transport management app.
 */
export class Api<
	SecurityDataType extends unknown
> extends HttpClient<SecurityDataType> {
	api = {
		/**
		 * No description
		 *
		 * @name AppControllerIndex
		 * @request GET:/api
		 */
		appControllerIndex: (params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/api`,
				method: "GET",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthControllerLogin
		 * @request POST:/api/auth/login
		 */
		authControllerLogin: (data: LoginPayload, params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/api/auth/login`,
				method: "POST",
				body: data,
				type: ContentType.Json,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthControllerRegister
		 * @request POST:/api/auth/register
		 */
		authControllerRegister: (params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/api/auth/register`,
				method: "POST",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthControllerPasswordReset
		 * @request POST:/api/auth/password-reset
		 */
		authControllerPasswordReset: (
			data: BasicUserDto,
			params: RequestParams = {}
		) =>
			this.request<void, any>({
				path: `/api/auth/password-reset`,
				method: "POST",
				body: data,
				type: ContentType.Json,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Company
		 * @name CompanyControllerIndex
		 * @request GET:/api/company/ping
		 */
		companyControllerIndex: (params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/api/company/ping`,
				method: "GET",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Company
		 * @name CompanyControllerGetMyCompanies
		 * @request GET:/api/company
		 */
		companyControllerGetMyCompanies: (params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/api/company`,
				method: "GET",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Company
		 * @name CompanyControllerCreateCompany
		 * @request POST:/api/company
		 */
		companyControllerCreateCompany: (
			data: CreateCompanyDto,
			params: RequestParams = {}
		) =>
			this.request<void, any>({
				path: `/api/company`,
				method: "POST",
				body: data,
				type: ContentType.Json,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Company
		 * @name CompanyControllerGetById
		 * @request GET:/api/company/{id}
		 */
		companyControllerGetById: (id: string, params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/api/company/${id}`,
				method: "GET",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Company
		 * @name CompanyControllerUpdateCompany
		 * @request PUT:/api/company/{id}
		 */
		companyControllerUpdateCompany: (
			id: string,
			data: UpdateCompanyDto,
			params: RequestParams = {}
		) =>
			this.request<void, any>({
				path: `/api/company/${id}`,
				method: "PUT",
				body: data,
				type: ContentType.Json,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Company
		 * @name CompanyControllerDeleteCompany
		 * @request DELETE:/api/company/{id}
		 */
		companyControllerDeleteCompany: (id: string, params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/api/company/${id}`,
				method: "DELETE",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Driver
		 * @name DriverControllerGetAll
		 * @request GET:/api/driver
		 */
		driverControllerGetAll: (params: RequestParams = {}) =>
			this.request<Driver[], any>({
				path: `/api/driver`,
				method: "GET",
				format: "json",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Driver
		 * @name DriverControllerCreateDriver
		 * @request POST:/api/driver
		 */
		driverControllerCreateDriver: (
			data: CreateDriverDto,
			params: RequestParams = {}
		) =>
			this.request<void, any>({
				path: `/api/driver`,
				method: "POST",
				body: data,
				type: ContentType.Json,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Driver
		 * @name DriverControllerGetDriverById
		 * @request GET:/api/driver/{id}
		 */
		driverControllerGetDriverById: (id: string, params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/api/driver/${id}`,
				method: "GET",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Driver
		 * @name DriverControllerUpdateDriver
		 * @request PUT:/api/driver/{id}
		 */
		driverControllerUpdateDriver: (
			id: number,
			data: UpdateDriverDto,
			params: RequestParams = {}
		) =>
			this.request<void, any>({
				path: `/api/driver/${id}`,
				method: "PUT",
				body: data,
				type: ContentType.Json,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Driver
		 * @name DriverControllerDeleteDriver
		 * @request DELETE:/api/driver/{id}
		 */
		driverControllerDeleteDriver: (id: number, params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/api/driver/${id}`,
				method: "DELETE",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Driver periodic inspection
		 * @name DriverPeriodicInspectionControllerGetInspectionById
		 * @request GET:/api/driver-periodic-inspection
		 */
		driverPeriodicInspectionControllerGetInspectionById: (
			query: {
				DriverId: number;
				/** @format date-time */
				FromDate: string;
				/** @format date-time */
				ToDate: string;
				DocumentType: string;
			},
			params: RequestParams = {}
		) =>
			this.request<void, any>({
				path: `/api/driver-periodic-inspection`,
				method: "GET",
				query: query,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Driver periodic inspection
		 * @name DriverPeriodicInspectionControllerCreateInspection
		 * @request POST:/api/driver-periodic-inspection
		 */
		driverPeriodicInspectionControllerCreateInspection: (
			data: CreateDriverPeriodicInspectionDto,
			params: RequestParams = {}
		) =>
			this.request<void, any>({
				path: `/api/driver-periodic-inspection`,
				method: "POST",
				body: data,
				type: ContentType.Json,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Driver periodic inspection
		 * @name DriverPeriodicInspectionControllerUpdateInspection
		 * @request PUT:/api/driver-periodic-inspection
		 */
		driverPeriodicInspectionControllerUpdateInspection: (
			query: {
				DriverId: number;
				/** @format date-time */
				FromDate: string;
				/** @format date-time */
				ToDate: string;
				DocumentType: string;
			},
			data: UpdateDriverPeriodicInspectionDto,
			params: RequestParams = {}
		) =>
			this.request<void, any>({
				path: `/api/driver-periodic-inspection`,
				method: "PUT",
				query: query,
				body: data,
				type: ContentType.Json,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Driver periodic inspection
		 * @name DriverPeriodicInspectionControllerDeleteInspection
		 * @request DELETE:/api/driver-periodic-inspection
		 */
		driverPeriodicInspectionControllerDeleteInspection: (
			query: {
				DriverId: number;
				/** @format date-time */
				FromDate: string;
				/** @format date-time */
				ToDate: string;
				DocumentType: string;
			},
			params: RequestParams = {}
		) =>
			this.request<void, any>({
				path: `/api/driver-periodic-inspection`,
				method: "DELETE",
				query: query,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Users
		 * @name UsersControllerGetMe
		 * @request GET:/api/users/me
		 */
		usersControllerGetMe: (params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/api/users/me`,
				method: "GET",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Vehicle mileage
		 * @name VehicleMileageControllerPing
		 * @request GET:/api/vehicle-mileage/ping
		 */
		vehicleMileageControllerPing: (params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/api/vehicle-mileage/ping`,
				method: "GET",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Vehicle mileage
		 * @name VehicleMileageControllerGetNewest
		 * @request GET:/api/vehicle-mileage/newest/{vehicleId}
		 */
		vehicleMileageControllerGetNewest: (
			vehicleId: number,
			params: RequestParams = {}
		) =>
			this.request<void, any>({
				path: `/api/vehicle-mileage/newest/${vehicleId}`,
				method: "GET",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Vehicle mileage
		 * @name VehicleMileageControllerGetAllByVehicle
		 * @request GET:/api/vehicle-mileage/byVehicle/{vehicleId}
		 */
		vehicleMileageControllerGetAllByVehicle: (
			vehicleId: number,
			params: RequestParams = {}
		) =>
			this.request<void, any>({
				path: `/api/vehicle-mileage/byVehicle/${vehicleId}`,
				method: "GET",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Vehicle mileage
		 * @name VehicleMileageControllerGetById
		 * @request GET:/api/vehicle-mileage/{vehicleId}/{mileageKm}/{date}
		 */
		vehicleMileageControllerGetById: (
			vehicleId: number,
			mileageKm: number,
			date: string,
			params: RequestParams = {}
		) =>
			this.request<void, any>({
				path: `/api/vehicle-mileage/${vehicleId}/${mileageKm}/${date}`,
				method: "GET",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Vehicle mileage
		 * @name VehicleMileageControllerDeleteMileage
		 * @request DELETE:/api/vehicle-mileage/{vehicleId}/{mileageKm}/{date}
		 */
		vehicleMileageControllerDeleteMileage: (
			vehicleId: number,
			mileageKm: number,
			date: string,
			params: RequestParams = {}
		) =>
			this.request<void, any>({
				path: `/api/vehicle-mileage/${vehicleId}/${mileageKm}/${date}`,
				method: "DELETE",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Vehicle mileage
		 * @name VehicleMileageControllerSetMileage
		 * @request POST:/api/vehicle-mileage
		 */
		vehicleMileageControllerSetMileage: (
			data: CreateVehicleMileageDto,
			params: RequestParams = {}
		) =>
			this.request<void, any>({
				path: `/api/vehicle-mileage`,
				method: "POST",
				body: data,
				type: ContentType.Json,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Vehicle
		 * @name VehicleControllerIndex
		 * @request GET:/api/vehicle/ping
		 */
		vehicleControllerIndex: (params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/api/vehicle/ping`,
				method: "GET",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Vehicle
		 * @name VehicleControllerFindAll
		 * @request GET:/api/vehicle
		 */
		vehicleControllerFindAll: (params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/api/vehicle`,
				method: "GET",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Vehicle
		 * @name VehicleControllerCreate
		 * @request POST:/api/vehicle
		 */
		vehicleControllerCreate: (
			data: CreateVehicleDto,
			params: RequestParams = {}
		) =>
			this.request<void, any>({
				path: `/api/vehicle`,
				method: "POST",
				body: data,
				type: ContentType.Json,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Vehicle
		 * @name VehicleControllerFindById
		 * @request GET:/api/vehicle/{id}
		 */
		vehicleControllerFindById: (id: number, params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/api/vehicle/${id}`,
				method: "GET",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Vehicle
		 * @name VehicleControllerUpdateVehicle
		 * @request PUT:/api/vehicle/{id}
		 */
		vehicleControllerUpdateVehicle: (
			id: number,
			data: UpdateVehicleDto,
			params: RequestParams = {}
		) =>
			this.request<void, any>({
				path: `/api/vehicle/${id}`,
				method: "PUT",
				body: data,
				type: ContentType.Json,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Vehicle
		 * @name VehicleControllerDeleteVehicle
		 * @request DELETE:/api/vehicle/{id}
		 */
		vehicleControllerDeleteVehicle: (id: number, params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/api/vehicle/${id}`,
				method: "DELETE",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Vehicle
		 * @name VehicleControllerIsExist
		 * @request GET:/api/vehicle/{id}/exist
		 */
		vehicleControllerIsExist: (id: number, params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/api/vehicle/${id}/exist`,
				method: "GET",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Vehicle periodic inspection
		 * @name VehiclePeriodicInspectionControllerGetAll
		 * @request GET:/api/vehicle-periodic-inspection
		 */
		vehiclePeriodicInspectionControllerGetAll: (params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/api/vehicle-periodic-inspection`,
				method: "GET",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Vehicle periodic inspection
		 * @name VehiclePeriodicInspectionControllerCreate
		 * @request POST:/api/vehicle-periodic-inspection
		 */
		vehiclePeriodicInspectionControllerCreate: (
			data: CreateVehiclePeriodicInspectionDto,
			params: RequestParams = {}
		) =>
			this.request<void, any>({
				path: `/api/vehicle-periodic-inspection`,
				method: "POST",
				body: data,
				type: ContentType.Json,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Vehicle periodic inspection
		 * @name VehiclePeriodicInspectionControllerGetByVehicle
		 * @request GET:/api/vehicle-periodic-inspection/byVehicle/{vehicleId}
		 */
		vehiclePeriodicInspectionControllerGetByVehicle: (
			vehicleId: number,
			params: RequestParams = {}
		) =>
			this.request<void, any>({
				path: `/api/vehicle-periodic-inspection/byVehicle/${vehicleId}`,
				method: "GET",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Vehicle periodic inspection
		 * @name VehiclePeriodicInspectionControllerGetNewest
		 * @request GET:/api/vehicle-periodic-inspection/newest/{vehicleId}/{inspectionType}
		 */
		vehiclePeriodicInspectionControllerGetNewest: (
			vehicleId: number,
			inspectionType: string,
			params: RequestParams = {}
		) =>
			this.request<void, any>({
				path: `/api/vehicle-periodic-inspection/newest/${vehicleId}/${inspectionType}`,
				method: "GET",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Vehicle periodic inspection
		 * @name VehiclePeriodicInspectionControllerGetById
		 * @request GET:/api/vehicle-periodic-inspection/{vehicleId}/{fromDate}/{toDate}/{inspectionType}
		 */
		vehiclePeriodicInspectionControllerGetById: (
			vehicleId: number,
			fromDate: any,
			toDate: any,
			inspectionType: string,
			params: RequestParams = {}
		) =>
			this.request<void, any>({
				path: `/api/vehicle-periodic-inspection/${vehicleId}/${fromDate}/${toDate}/${inspectionType}`,
				method: "GET",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Vehicle periodic inspection
		 * @name VehiclePeriodicInspectionControllerUpdate
		 * @request PUT:/api/vehicle-periodic-inspection/{vehicleId}/{fromDate}/{toDate}/{inspectionType}
		 */
		vehiclePeriodicInspectionControllerUpdate: (
			vehicleId: number,
			fromDate: any,
			toDate: any,
			inspectionType: string,
			data: UpdateVehiclePeriodicInspectionDto,
			params: RequestParams = {}
		) =>
			this.request<void, any>({
				path: `/api/vehicle-periodic-inspection/${vehicleId}/${fromDate}/${toDate}/${inspectionType}`,
				method: "PUT",
				body: data,
				type: ContentType.Json,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Vehicle periodic inspection
		 * @name VehiclePeriodicInspectionControllerDelete
		 * @request DELETE:/api/vehicle-periodic-inspection/{vehicleId}/{fromDate}/{toDate}/{inspectionType}
		 */
		vehiclePeriodicInspectionControllerDelete: (
			vehicleId: number,
			fromDate: any,
			toDate: any,
			inspectionType: string,
			params: RequestParams = {}
		) =>
			this.request<void, any>({
				path: `/api/vehicle-periodic-inspection/${vehicleId}/${fromDate}/${toDate}/${inspectionType}`,
				method: "DELETE",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Driver Preferred Vehicles
		 * @name DriverPreferredVehiclesControllerGetPreferredData
		 * @request GET:/api/driver-preferred-vehicles/all/{byType}/{id}
		 */
		driverPreferredVehiclesControllerGetPreferredData: (
			byType: string,
			id: number,
			params: RequestParams = {}
		) =>
			this.request<void, any>({
				path: `/api/driver-preferred-vehicles/all/${byType}/${id}`,
				method: "GET",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Driver Preferred Vehicles
		 * @name DriverPreferredVehiclesControllerGetById
		 * @request GET:/api/driver-preferred-vehicles/{driverId}/{vehicleId}
		 */
		driverPreferredVehiclesControllerGetById: (
			driverId: number,
			vehicleId: number,
			params: RequestParams = {}
		) =>
			this.request<void, any>({
				path: `/api/driver-preferred-vehicles/${driverId}/${vehicleId}`,
				method: "GET",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Driver Preferred Vehicles
		 * @name DriverPreferredVehiclesControllerUpdate
		 * @request PUT:/api/driver-preferred-vehicles/{driverId}/{vehicleId}
		 */
		driverPreferredVehiclesControllerUpdate: (
			driverId: number,
			vehicleId: number,
			data: UpdateDriverPreferredVehiclesDto,
			params: RequestParams = {}
		) =>
			this.request<void, any>({
				path: `/api/driver-preferred-vehicles/${driverId}/${vehicleId}`,
				method: "PUT",
				body: data,
				type: ContentType.Json,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Driver Preferred Vehicles
		 * @name DriverPreferredVehiclesControllerDelete
		 * @request DELETE:/api/driver-preferred-vehicles/{driverId}/{vehicleId}
		 */
		driverPreferredVehiclesControllerDelete: (
			driverId: number,
			vehicleId: number,
			params: RequestParams = {}
		) =>
			this.request<void, any>({
				path: `/api/driver-preferred-vehicles/${driverId}/${vehicleId}`,
				method: "DELETE",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Driver Preferred Vehicles
		 * @name DriverPreferredVehiclesControllerCreate
		 * @request POST:/api/driver-preferred-vehicles
		 */
		driverPreferredVehiclesControllerCreate: (
			data: CreateDriverPreferredVehiclesDto,
			params: RequestParams = {}
		) =>
			this.request<void, any>({
				path: `/api/driver-preferred-vehicles`,
				method: "POST",
				body: data,
				type: ContentType.Json,
				...params,
			}),
	};
}
