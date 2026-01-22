from pydantic import BaseModel, Field
from typing import Optional

class ListServiceBase(BaseModel):
    service: str = Field(
        ...,
        description="Service yang bisa dilakukan"
    )

class ListServiceCreate(ListServiceBase):
    pass

class ListServiceUpdate(BaseModel):
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