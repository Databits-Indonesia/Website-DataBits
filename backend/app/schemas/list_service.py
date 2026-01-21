from pydantic import BaseModel, Field
from typing import Optional

class ListServiceBase(BaseModel):
    # service_id: int = Field(
    #     ...,
    #     description="ID Service"
    # )
    service: str = Field(
        ...,
        description="Service yang bisa dilakukan"
    )

class ListServiceCreate(ListServiceBase):
    service_id: int = Field(
        ...,
        description="ID Service"
    )

class ListServiceUpdate(BaseModel):
    service_id: Optional[int] = Field(
        None,
        description="ID Service"
    )
    service: Optional[str] = Field(
        None,
        description="Service yang bisa dilakukan"
    )

class ListServiceRead(ListServiceBase):
    id: int = Field(
        ...,
        description="ID List Service"
    )
    model_config = {
        "from_attributes": True
    }