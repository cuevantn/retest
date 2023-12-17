// Generated by Xata Codegen 0.28.1. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "experiments",
    columns: [
      {
        name: "name",
        type: "string",
        notNull: true,
        defaultValue: "Default name",
      },
      { name: "description", type: "text" },
      { name: "sampleSizeAbsolute", type: "int" },
      { name: "sampleSizeRelative", type: "float" },
      { name: "startedAt", type: "datetime" },
      { name: "endedAt", type: "datetime" },
    ],
    revLinks: [
      { column: "experiment", table: "variants" },
      { column: "experiment", table: "experiment_country_relations" },
      { column: "experiment", table: "metrics" },
    ],
  },
  {
    name: "variants",
    columns: [
      { name: "experiment", type: "link", link: { table: "experiments" } },
      {
        name: "name",
        type: "string",
        notNull: true,
        defaultValue: "Default name",
      },
      { name: "description", type: "text" },
      { name: "subjectCounter", type: "int", notNull: true, defaultValue: "0" },
    ],
    revLinks: [
      { column: "variant", table: "subject_variant_relations" },
      { column: "variant", table: "events" },
    ],
  },
  {
    name: "subjects",
    columns: [
      { name: "hashedIpAddress", type: "string", unique: true },
      { name: "country", type: "link", link: { table: "countries" } },
    ],
    revLinks: [
      { column: "subject", table: "devices" },
      { column: "subject", table: "subject_variant_relations" },
    ],
  },
  {
    name: "countries",
    columns: [
      {
        name: "name",
        type: "string",
        notNull: true,
        defaultValue: "Default name",
      },
    ],
    revLinks: [
      { column: "country", table: "experiment_country_relations" },
      { column: "country", table: "subjects" },
    ],
  },
  {
    name: "experiment_country_relations",
    columns: [
      { name: "experiment", type: "link", link: { table: "experiments" } },
      { name: "country", type: "link", link: { table: "countries" } },
    ],
  },
  {
    name: "metrics",
    columns: [
      {
        name: "name",
        type: "string",
        notNull: true,
        defaultValue: "Default name",
      },
      { name: "experiment", type: "link", link: { table: "experiments" } },
      {
        name: "type",
        type: "string",
        notNull: true,
        defaultValue: "Default type",
      },
    ],
    revLinks: [{ column: "metric", table: "events" }],
  },
  {
    name: "events",
    columns: [
      { name: "metric", type: "link", link: { table: "metrics" } },
      { name: "device", type: "link", link: { table: "devices" } },
      { name: "variant", type: "link", link: { table: "variants" } },
    ],
  },
  {
    name: "browsers",
    columns: [
      {
        name: "name",
        type: "string",
        notNull: true,
        defaultValue: "Default name",
      },
    ],
    revLinks: [{ column: "browser", table: "devices" }],
  },
  {
    name: "operating_systems",
    columns: [
      {
        name: "name",
        type: "string",
        notNull: true,
        defaultValue: "Default name",
      },
    ],
    revLinks: [{ column: "operatingSystem", table: "devices" }],
  },
  {
    name: "devices",
    columns: [
      { name: "subject", type: "link", link: { table: "subjects" } },
      { name: "browser", type: "link", link: { table: "browsers" } },
      {
        name: "operatingSystem",
        type: "link",
        link: { table: "operating_systems" },
      },
    ],
    revLinks: [{ column: "device", table: "events" }],
  },
  {
    name: "subject_variant_relations",
    columns: [
      { name: "subject", type: "link", link: { table: "subjects" } },
      { name: "variant", type: "link", link: { table: "variants" } },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Experiments = InferredTypes["experiments"];
export type ExperimentsRecord = Experiments & XataRecord;

export type Variants = InferredTypes["variants"];
export type VariantsRecord = Variants & XataRecord;

export type Subjects = InferredTypes["subjects"];
export type SubjectsRecord = Subjects & XataRecord;

export type Countries = InferredTypes["countries"];
export type CountriesRecord = Countries & XataRecord;

export type ExperimentCountryRelations =
  InferredTypes["experiment_country_relations"];
export type ExperimentCountryRelationsRecord = ExperimentCountryRelations &
  XataRecord;

export type Metrics = InferredTypes["metrics"];
export type MetricsRecord = Metrics & XataRecord;

export type Events = InferredTypes["events"];
export type EventsRecord = Events & XataRecord;

export type Browsers = InferredTypes["browsers"];
export type BrowsersRecord = Browsers & XataRecord;

export type OperatingSystems = InferredTypes["operating_systems"];
export type OperatingSystemsRecord = OperatingSystems & XataRecord;

export type Devices = InferredTypes["devices"];
export type DevicesRecord = Devices & XataRecord;

export type SubjectVariantRelations =
  InferredTypes["subject_variant_relations"];
export type SubjectVariantRelationsRecord = SubjectVariantRelations &
  XataRecord;

export type DatabaseSchema = {
  experiments: ExperimentsRecord;
  variants: VariantsRecord;
  subjects: SubjectsRecord;
  countries: CountriesRecord;
  experiment_country_relations: ExperimentCountryRelationsRecord;
  metrics: MetricsRecord;
  events: EventsRecord;
  browsers: BrowsersRecord;
  operating_systems: OperatingSystemsRecord;
  devices: DevicesRecord;
  subject_variant_relations: SubjectVariantRelationsRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL: "https://retest-cv9l0q.us-east-1.xata.sh/db/retest",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
