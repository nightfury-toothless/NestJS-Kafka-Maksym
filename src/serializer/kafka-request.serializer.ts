import {
  isNil,
  isObject,
  isPlainObject,
  isString,
  isUndefined,
} from '@nestjs/common/utils/shared.utils';
import { Serializer } from '@nestjs/microservices';

export interface KafkaRequest<T = any> {
  key: Buffer | string | null;
  value: T;
  topic: string;
  headers: Record<string, any>;
}

export class KafkaRequestSerializer implements Serializer<any, KafkaRequest> {
  serialize(value: any): KafkaRequest {
    return value;
  }

  public encode(value: any): Buffer | string | null {
    const isObjectOrArray =
      !isNil(value) && !isString(value) && !Buffer.isBuffer(value);

    if (isObjectOrArray) {
      return isPlainObject(value) || Array.isArray(value)
        ? JSON.stringify(value)
        : value.toString();
    } else if (isUndefined(value)) {
      return null;
    }
    return value;
  }
}
